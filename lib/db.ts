import "server-only";
import mysql from "mysql2/promise";

/**
 * Connection pool for the legacy `seedlingschools2019` database.
 *
 * The new admissions flow writes into the same `tb_online_form` table the PHP
 * site uses, so existing reports and `admission_form_view.php` keep working
 * against one unified set of rows rather than a parallel table nobody checks.
 *
 * Every query here is parameterised. The legacy handler concatenated
 * `$_REQUEST` values straight into its INSERT, which is why 674 rows in this
 * table currently contain sqlmap payloads.
 */

let pool: mysql.Pool | undefined;

export function db(): mysql.Pool {
  if (!pool) {
    const required = (name: string) => {
      const v = process.env[name];
      if (!v) throw new Error(`Missing required environment variable: ${name}`);
      return v;
    };
    pool = mysql.createPool({
      host: process.env.DB_HOST ?? "localhost",
      user: required("DB_USER"),
      password: required("DB_PASSWORD"),
      database: process.env.DB_NAME ?? "seedlingschools2019",
      waitForConnections: true,
      connectionLimit: 5,
      // The legacy schema stores dates as DATE; keep them as strings so we
      // don't get timezone drift between Node and MySQL.
      dateStrings: true,
    });
  }
  return pool;
}

export interface ApplicationInput {
  legacySchoolName: string;
  feeInr: number;
  className: string;
  name: string;
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  gender: string;
  category: string;
  caste: string;
  religion: string;
  aadharCard: string;
  mobile: string;
  email: string;
  dobYear: string;
  dobMonth: string;
  dobDay: string;
  placeBirth: string;
  address: string;
  state: string;
  district: string;
  pinCode: string;
  residential: string;
  physically: string;
  namePreviousSchool: string;
  mediumPreviousSchool: string;
  incomeParents: string;
  nameSibling: string;
  classSibling: string;
}

export interface CreatedApplication {
  id: number;
  uniqueNo: number;
}

/**
 * Insert an application and return its identifiers.
 *
 * `unique_no` continues the legacy max+1 sequence so the numbering parents see
 * stays continuous with historic applications — but it is computed inside a
 * transaction with the row locked, unlike the legacy `SELECT ... ORDER BY id
 * DESC LIMIT 1` which could hand the same number to two concurrent applicants.
 */
export async function createApplication(
  input: ApplicationInput
): Promise<CreatedApplication> {
  const conn = await db().getConnection();
  try {
    await conn.beginTransaction();

    const [rows] = await conn.query<mysql.RowDataPacket[]>(
      "SELECT COALESCE(MAX(unique_no), 0) + 1 AS next FROM tb_online_form FOR UPDATE"
    );
    const uniqueNo = Number(rows[0].next);

    const [result] = await conn.execute<mysql.ResultSetHeader>(
      `INSERT INTO tb_online_form
        (unique_no, school, fee, classname, name, father_name, father_occupation,
         mother_name, mother_occupation, gender, category, caste, religion,
         aadhar_card, mobile, email, dob_year, dob_month, dob_day, place_birth,
         address, state, district, pin_code, residential, physically,
         name_previous_school, medium_previous_school, income_parents,
         name_sibling, class_sibling, payment_status, IsDel, create_date)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,'PENDING',0,CURDATE())`,
      [
        uniqueNo,
        input.legacySchoolName,
        String(input.feeInr),
        input.className,
        input.name,
        input.fatherName,
        input.fatherOccupation,
        input.motherName,
        input.motherOccupation,
        input.gender,
        input.category,
        input.caste,
        input.religion,
        input.aadharCard,
        input.mobile,
        input.email,
        input.dobYear,
        input.dobMonth,
        input.dobDay,
        input.placeBirth,
        input.address,
        input.state,
        input.district,
        input.pinCode,
        input.residential,
        input.physically,
        input.namePreviousSchool,
        input.mediumPreviousSchool,
        input.incomeParents,
        input.nameSibling,
        input.classSibling,
      ]
    );

    await conn.commit();
    return { id: result.insertId, uniqueNo };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

/** Record the gateway transaction id against a row before redirecting out. */
export async function attachTransaction(
  id: number,
  txnId: string,
  amountInr: number
): Promise<void> {
  await db().execute(
    "UPDATE tb_online_form SET txnid = ?, amount = ? WHERE id = ?",
    [txnId, String(amountInr), id]
  );
}

export interface PaymentOutcome {
  txnId: string;
  status: "SUCCESS" | "FAILED";
  gatewayRef?: string;
  mode?: string;
  amount?: string;
  errorMessage?: string;
}

/**
 * Record a gateway result.
 *
 * Matches on `txnid` rather than a client-supplied row id so a forged callback
 * can't retarget an unrelated application, and refuses to overwrite a row that
 * already reached SUCCESS so a replayed callback can't downgrade a paid
 * application to failed.
 */
export async function recordPaymentOutcome(
  outcome: PaymentOutcome
): Promise<boolean> {
  const [result] = await db().execute<mysql.ResultSetHeader>(
    `UPDATE tb_online_form
        SET payment_status = ?, mihpayid = ?, mode = ?, amount = COALESCE(?, amount), error_msg = ?
      WHERE txnid = ? AND (payment_status IS NULL OR payment_status <> 'SUCCESS')`,
    [
      outcome.status,
      outcome.gatewayRef ?? null,
      outcome.mode ?? null,
      outcome.amount ?? null,
      outcome.errorMessage?.slice(0, 80) ?? null,
      outcome.txnId,
    ]
  );
  return result.affectedRows > 0;
}

/** Fetch what the receipt/thank-you page needs, by transaction id. */
export async function findByTransaction(txnId: string) {
  const [rows] = await db().execute<mysql.RowDataPacket[]>(
    `SELECT unique_no, school, name, classname, amount, payment_status, create_date
       FROM tb_online_form WHERE txnid = ? LIMIT 1`,
    [txnId]
  );
  return rows[0];
}

export interface Receipt {
  applicationNo: number;
  school: string;
  studentName: string;
  className: string;
  fatherName: string;
  amount: string;
  transactionId: string | null;
  gatewayRef: string | null;
  paymentStatus: string | null;
  paidOn: string;
}

/**
 * Look up a receipt by application number **and** registered mobile.
 *
 * Both are required deliberately. The legacy `payment-receipt.php?tag=N` took
 * the application number alone with no authentication, so anyone could walk the
 * sequence and read every applicant's name, address and phone number. Requiring
 * the mobile that was registered against the row turns enumeration into
 * guessing a 10-digit number per application.
 */
export async function findReceipt(
  applicationNo: number,
  mobile: string
): Promise<Receipt | null> {
  const [rows] = await db().execute<mysql.RowDataPacket[]>(
    `SELECT unique_no, school, name, classname, father_name, amount,
            txnid, mihpayid, payment_status, create_date
       FROM tb_online_form
      WHERE unique_no = ? AND mobile = ? AND IsDel = 0
      LIMIT 1`,
    [applicationNo, mobile]
  );

  const row = rows[0];
  if (!row) return null;

  return {
    applicationNo: Number(row.unique_no),
    school: String(row.school ?? ""),
    studentName: String(row.name ?? ""),
    className: String(row.classname ?? ""),
    fatherName: String(row.father_name ?? ""),
    amount: String(row.amount ?? row.fee ?? ""),
    transactionId: row.txnid ? String(row.txnid) : null,
    gatewayRef: row.mihpayid ? String(row.mihpayid) : null,
    paymentStatus: row.payment_status ? String(row.payment_status) : null,
    paidOn: String(row.create_date ?? ""),
  };
}

export interface ApplicationListItem {
  id: number;
  applicationNo: number;
  school: string;
  className: string;
  studentName: string;
  fatherName: string;
  mobile: string;
  email: string;
  fee: string;
  amount: string | null;
  paymentStatus: string | null;
  createdOn: string;
}

export interface ListFilters {
  /** Free text across name, mobile, application number. */
  q?: string;
  /** Exact `tb_online_form.school` value. */
  school?: string;
  /** 'SUCCESS' | 'FAILED' | 'PENDING' | 'paid' | 'unpaid' */
  status?: string;
  from?: string;
  to?: string;
  page?: number;
  perPage?: number;
}

/**
 * Build the shared WHERE clause for the admin list and its CSV export.
 *
 * Every value is bound, never interpolated. The legacy staff view
 * (`admission_form_view.php`) concatenated `$_GET['no']` straight into its
 * query — and had no authentication at all.
 */
function buildFilter(f: ListFilters): { sql: string; params: (string | number)[] } {
  const clauses: string[] = ["IsDel = 0"];
  const params: (string | number)[] = [];

  if (f.q?.trim()) {
    const like = `%${f.q.trim()}%`;
    clauses.push("(name LIKE ? OR mobile LIKE ? OR father_name LIKE ? OR CAST(unique_no AS CHAR) LIKE ?)");
    params.push(like, like, like, like);
  }
  if (f.school?.trim()) {
    clauses.push("school = ?");
    params.push(f.school.trim());
  }
  if (f.status?.trim()) {
    const s = f.status.trim().toLowerCase();
    if (s === "paid") {
      clauses.push("UPPER(COALESCE(payment_status,'')) IN ('SUCCESS','SUCCESSFUL')");
    } else if (s === "unpaid") {
      clauses.push("UPPER(COALESCE(payment_status,'')) NOT IN ('SUCCESS','SUCCESSFUL')");
    } else {
      clauses.push("UPPER(COALESCE(payment_status,'')) = ?");
      params.push(s.toUpperCase());
    }
  }
  if (f.from?.trim()) {
    clauses.push("create_date >= ?");
    params.push(f.from.trim());
  }
  if (f.to?.trim()) {
    clauses.push("create_date <= ?");
    params.push(f.to.trim());
  }

  return { sql: clauses.join(" AND "), params };
}

export async function countApplications(f: ListFilters): Promise<number> {
  const { sql, params } = buildFilter(f);
  const [rows] = await db().execute<mysql.RowDataPacket[]>(
    `SELECT COUNT(*) AS n FROM tb_online_form WHERE ${sql}`,
    params
  );
  return Number(rows[0]?.n ?? 0);
}

export async function listApplications(
  f: ListFilters
): Promise<ApplicationListItem[]> {
  const { sql, params } = buildFilter(f);
  const perPage = Math.min(Math.max(f.perPage ?? 50, 1), 200);
  const page = Math.max(f.page ?? 1, 1);
  const offset = (page - 1) * perPage;

  // LIMIT/OFFSET are clamped integers above, not user strings.
  const [rows] = await db().execute<mysql.RowDataPacket[]>(
    `SELECT id, unique_no, school, classname, name, father_name, mobile, email,
            fee, amount, payment_status, create_date
       FROM tb_online_form
      WHERE ${sql}
      ORDER BY id DESC
      LIMIT ${perPage} OFFSET ${offset}`,
    params
  );

  return rows.map((r) => ({
    id: Number(r.id),
    applicationNo: Number(r.unique_no),
    school: String(r.school ?? ""),
    className: String(r.classname ?? ""),
    studentName: String(r.name ?? ""),
    fatherName: String(r.father_name ?? ""),
    mobile: String(r.mobile ?? ""),
    email: String(r.email ?? ""),
    fee: String(r.fee ?? ""),
    amount: r.amount ? String(r.amount) : null,
    paymentStatus: r.payment_status ? String(r.payment_status) : null,
    createdOn: String(r.create_date ?? ""),
  }));
}

/** Full record for the detail view. */
export async function getApplication(id: number) {
  const [rows] = await db().execute<mysql.RowDataPacket[]>(
    "SELECT * FROM tb_online_form WHERE id = ? AND IsDel = 0 LIMIT 1",
    [id]
  );
  return rows[0] ?? null;
}

/** Distinct school values present in the data, for the filter dropdown. */
export async function listSchoolsInData(): Promise<string[]> {
  const [rows] = await db().execute<mysql.RowDataPacket[]>(
    "SELECT DISTINCT school FROM tb_online_form WHERE IsDel = 0 AND school <> '' ORDER BY school"
  );
  return rows.map((r) => String(r.school));
}

/**
 * Rows for CSV export.
 *
 * Runs its own query rather than reusing `listApplications`, whose `perPage` is
 * clamped to 200 for the paged UI — routing export through it would silently
 * truncate the file. Still capped, so an unfiltered export can't exhaust memory.
 */
export async function exportApplications(
  f: ListFilters,
  limit = 5000
): Promise<ApplicationListItem[]> {
  const { sql, params } = buildFilter(f);
  const cap = Math.min(Math.max(limit, 1), 20000);

  const [rows] = await db().execute<mysql.RowDataPacket[]>(
    `SELECT id, unique_no, school, classname, name, father_name, mobile, email,
            fee, amount, payment_status, create_date
       FROM tb_online_form
      WHERE ${sql}
      ORDER BY id DESC
      LIMIT ${cap}`,
    params
  );

  return rows.map((r) => ({
    id: Number(r.id),
    applicationNo: Number(r.unique_no),
    school: String(r.school ?? ""),
    className: String(r.classname ?? ""),
    studentName: String(r.name ?? ""),
    fatherName: String(r.father_name ?? ""),
    mobile: String(r.mobile ?? ""),
    email: String(r.email ?? ""),
    fee: String(r.fee ?? ""),
    amount: r.amount ? String(r.amount) : null,
    paymentStatus: r.payment_status ? String(r.payment_status) : null,
    createdOn: String(r.create_date ?? ""),
  }));
}
