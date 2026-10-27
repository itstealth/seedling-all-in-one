import type { Metadata } from "next";
import { GRADES, SCHOOLS, findSchool } from "@/lib/schools";
import ApplyForm, { type SchoolOption } from "./ApplyForm";

export const metadata: Metadata = {
  title: "Apply Online — Seedling Group of Schools",
  description:
    "Submit an admission application and pay the registration fee online for any Seedling campus in Jaipur.",
};

/**
 * The shared application form.
 *
 * Reached under each school's own domain — sps.seedlingschools.com/admissions/apply
 * and friends proxy this path here, so the parent never leaves their school's
 * URL while one implementation handles every campus.
 */
export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ school?: string }>;
}) {
  const { school: requestedKey } = await searchParams;
  const preselected = findSchool(requestedKey);

  // Only the fields the browser legitimately needs. Merchant ids and the env
  // var names behind them never cross to the client.
  const options: SchoolOption[] = SCHOOLS.map((s) => ({
    key: s.key,
    label: s.label,
    feeInr: s.feeInr,
    theme: s.theme,
  }));

  return (
    <ApplyForm
      schools={options}
      grades={[...GRADES]}
      preselectedKey={preselected?.key ?? ""}
    />
  );
}
