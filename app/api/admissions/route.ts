import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { buildRedirectUrl, type AtomRequest } from "@/lib/atom";
import {
  coerceApplication,
  hasErrors,
  validateApplication,
} from "@/lib/application-schema";
import { attachTransaction, createApplication } from "@/lib/db";
import { findSchool, merchantCredentials } from "@/lib/schools";

export const runtime = "nodejs";
/** Never cache: every call writes a row and mints a transaction. */
export const dynamic = "force-dynamic";

/** Where to send the parent back to once the gateway is done. */
function returnUrlFor(callbackPath: string): string {
  const base = process.env.PUBLIC_BASE_URL ?? "https://seedlingschools.com";
  return `${base.replace(/\/$/, "")}${callbackPath}`;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const fields = coerceApplication(body);

  // The school key decides the amount and the merchant account. Anything the
  // client says about the fee is ignored entirely — see lib/schools.ts.
  const school = findSchool(fields.school);
  if (!school) {
    return NextResponse.json(
      { error: "Choose a school to apply to." },
      { status: 400 }
    );
  }

  const errors = validateApplication(fields);

  // The grade must be one this campus actually admits to. The legacy form
  // enforced this only by hiding options with jQuery, so any grade could be
  // posted to any school.
  if (fields.className && !school.grades.includes(fields.className)) {
    errors.className = `${school.label} doesn't admit to that grade.`;
  }

  if (hasErrors(errors)) {
    return NextResponse.json(
      { error: "Please correct the highlighted fields.", errors },
      { status: 422 }
    );
  }

  let credentials: ReturnType<typeof merchantCredentials>;
  try {
    credentials = merchantCredentials(school.merchant);
  } catch (err) {
    // A missing key is a deployment fault, not the parent's problem. Log it
    // server-side and show something they can act on.
    console.error("[admissions] merchant credentials unavailable:", err);
    return NextResponse.json(
      {
        error:
          "Online payment is temporarily unavailable. Please call the school office.",
      },
      { status: 503 }
    );
  }

  const mobile = fields.mobile.replace(/\D/g, "");

  let created: { id: number; uniqueNo: number };
  try {
    created = await createApplication({
      legacySchoolName: school.legacyName,
      feeInr: school.feeInr,
      className: fields.className,
      name: fields.name,
      fatherName: fields.fatherName,
      fatherOccupation: fields.fatherOccupation,
      motherName: fields.motherName,
      motherOccupation: fields.motherOccupation,
      gender: fields.gender,
      category: fields.category,
      caste: fields.caste,
      religion: fields.religion,
      aadharCard: fields.aadharCard.replace(/\D/g, ""),
      mobile,
      email: fields.email,
      dobYear: fields.dobYear,
      dobMonth: fields.dobMonth,
      dobDay: fields.dobDay,
      placeBirth: fields.placeBirth,
      address: fields.address,
      state: fields.state,
      district: fields.district,
      pinCode: fields.pinCode,
      residential: fields.residential,
      physically: fields.physically,
      namePreviousSchool: fields.namePreviousSchool,
      mediumPreviousSchool: fields.mediumPreviousSchool,
      incomeParents: fields.incomeParents,
      nameSibling: fields.nameSibling,
      classSibling: fields.classSibling,
    });
  } catch (err) {
    console.error("[admissions] could not save application:", err);
    return NextResponse.json(
      { error: "We couldn't save your application. Please try again." },
      { status: 500 }
    );
  }

  // A UUID-derived transaction id, rather than the legacy `rand(1,1000000)`
  // which collided often enough to make reconciliation ambiguous.
  const transactionId = `SDL${created.id}${randomUUID().replace(/-/g, "").slice(0, 10).toUpperCase()}`;

  try {
    await attachTransaction(created.id, transactionId, school.feeInr);
  } catch (err) {
    console.error("[admissions] could not attach transaction id:", err);
    return NextResponse.json(
      { error: "We couldn't start the payment. Please try again." },
      { status: 500 }
    );
  }

  const atomRequest: AtomRequest = {
    login: credentials.login,
    password: credentials.password,
    requestHashKey: credentials.requestHashKey,
    productId: process.env.ATOM_PRODUCT_ID ?? "SCHOOL",
    amount: String(school.feeInr),
    transactionId,
    clientCode: String(created.uniqueNo),
    returnUrl: returnUrlFor(credentials.callbackPath),
    customerName: fields.name,
    customerEmail: fields.email,
    customerMobile: mobile,
    customerAddress: fields.address,
    customerAccount: process.env.ATOM_CUSTOMER_ACCOUNT ?? "123456789",
  };

  return NextResponse.json({
    applicationNo: created.uniqueNo,
    transactionId,
    amountInr: school.feeInr,
    redirectUrl: buildRedirectUrl(atomRequest),
  });
}
