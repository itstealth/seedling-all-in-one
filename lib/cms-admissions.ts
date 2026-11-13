import "server-only";
import type mysql from "mysql2/promise";
import { db } from "@/lib/db";
import { SCHOOLS, type School } from "@/lib/schools";

/**
 * Which CMS inbox an application belongs to.
 *
 * Each school's leads live under that school in the CMS, and each school has
 * its own write-only ingest token, so an application for SPS can only ever be
 * filed under SPS -- whichever site the parent happened to apply on. The
 * token itself stays in the environment; only its variable name is used here.
 */
const TOKEN_ENV_BY_HOST: Record<string, string> = {
  "sps.seedlingschools.com": "CMS_INGEST_TOKEN_SPS",
  "smhs.seedlingschools.com": "CMS_INGEST_TOKEN_SMHS",
  "cambridge.seedlingschools.com": "CMS_INGEST_TOKEN_CAMBRIDGE",
};

export function cmsTokenEnvFor(school: School): string | undefined {
  try {
    return TOKEN_ENV_BY_HOST[new URL(school.origin).host];
  } catch {
    return undefined;
  }
}

/** The CMS retry key for an application: stable across the submit and the payment callback. */
export function cmsExternalId(uniqueNo: number | string): string {
  return `application-${uniqueNo}`;
}

/** What the payment callback needs to re-send the lead with its new payment status. */
export async function findForCms(
  txnId: string
): Promise<{ uniqueNo: number; school: School | undefined; mobile: string; email: string } | undefined> {
  const [rows] = await db().execute<mysql.RowDataPacket[]>(
    "SELECT unique_no, school, mobile, email FROM tb_online_form WHERE txnid = ? LIMIT 1",
    [txnId]
  );
  const row = rows[0];
  if (!row) return undefined;
  return {
    uniqueNo: Number(row.unique_no),
    school: SCHOOLS.find((s) => s.legacyName === row.school),
    mobile: String(row.mobile ?? ""),
    email: String(row.email ?? ""),
  };
}
