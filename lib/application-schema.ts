/**
 * Application field validation, shared by the form and the API route.
 *
 * The client runs this for immediate feedback; the server runs the exact same
 * checks again on the raw request body and trusts nothing that arrives. The
 * legacy handler validated on the client only — and had its OTP check replaced
 * with `if(1)` — so anything could be posted straight to the endpoint.
 */

export interface ApplicationFields {
  school: string;
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
  dobDay: string;
  dobMonth: string;
  dobYear: string;
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

export const EMPTY_APPLICATION: ApplicationFields = {
  school: "",
  className: "",
  name: "",
  fatherName: "",
  fatherOccupation: "",
  motherName: "",
  motherOccupation: "",
  gender: "",
  category: "",
  caste: "",
  religion: "",
  aadharCard: "",
  mobile: "",
  email: "",
  dobDay: "",
  dobMonth: "",
  dobYear: "",
  placeBirth: "",
  address: "",
  state: "",
  district: "",
  pinCode: "",
  residential: "",
  physically: "",
  namePreviousSchool: "",
  mediumPreviousSchool: "",
  incomeParents: "",
  nameSibling: "",
  classSibling: "",
};

export const GENDERS = ["Male", "Female", "Other"] as const;
export const CATEGORIES = ["General", "OBC", "SC", "ST", "EWS"] as const;
export const RESIDENTIAL = ["Day Scholar", "Hosteller"] as const;
export const YES_NO = ["No", "Yes"] as const;
export const MEDIUMS = ["English", "Hindi", "Other"] as const;

/** Fields the parent must fill in. Siblings and a few others stay optional. */
const REQUIRED: (keyof ApplicationFields)[] = [
  "school",
  "className",
  "name",
  "fatherName",
  "motherName",
  "gender",
  "category",
  "mobile",
  "dobDay",
  "dobMonth",
  "dobYear",
  "address",
  "state",
  "district",
  "pinCode",
];

const LABELS: Partial<Record<keyof ApplicationFields, string>> = {
  school: "School",
  className: "Grade applying for",
  name: "Student name",
  fatherName: "Father's name",
  motherName: "Mother's name",
  gender: "Gender",
  category: "Category",
  mobile: "Mobile number",
  dobDay: "Date of birth",
  dobMonth: "Date of birth",
  dobYear: "Date of birth",
  address: "Address",
  state: "State",
  district: "District",
  pinCode: "PIN code",
};

export type Errors = Partial<Record<keyof ApplicationFields, string>>;

export function validateMobile(mobile: string): string | null {
  const digits = mobile.replace(/\D/g, "");
  if (!digits) return "Mobile number is required";
  if (digits.length !== 10) return "Enter a 10-digit mobile number";
  if (!/^[6-9]/.test(digits)) return "Indian mobile numbers start with 6, 7, 8 or 9";
  return null;
}

export function validateApplication(data: ApplicationFields): Errors {
  const errors: Errors = {};

  for (const field of REQUIRED) {
    if (!String(data[field] ?? "").trim()) {
      errors[field] = `${LABELS[field] ?? "This field"} is required`;
    }
  }

  const mobileError = validateMobile(data.mobile);
  if (mobileError) errors.mobile = mobileError;

  if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Enter a valid email address, or leave it blank";
  }

  if (data.aadharCard.trim() && data.aadharCard.replace(/\D/g, "").length !== 12) {
    errors.aadharCard = "Aadhaar is 12 digits";
  }

  if (data.pinCode.trim() && !/^\d{6}$/.test(data.pinCode.trim())) {
    errors.pinCode = "PIN code is 6 digits";
  }

  const dob = toDate(data);
  if (data.dobDay && data.dobMonth && data.dobYear) {
    if (!dob) {
      errors.dobDay = "That date doesn't exist";
    } else if (dob > new Date()) {
      errors.dobDay = "Date of birth can't be in the future";
    }
  }

  return errors;
}

/** Returns null when the day/month/year don't form a real calendar date. */
export function toDate(data: ApplicationFields): Date | null {
  const d = Number(data.dobDay);
  const m = Number(data.dobMonth);
  const y = Number(data.dobYear);
  if (!d || !m || !y) return null;
  const date = new Date(y, m - 1, d);
  if (
    date.getFullYear() !== y ||
    date.getMonth() !== m - 1 ||
    date.getDate() !== d
  ) {
    return null;
  }
  return date;
}

export function hasErrors(errors: Errors): boolean {
  return Object.keys(errors).length > 0;
}

/**
 * Coerce an untrusted request body into the field shape.
 *
 * Every value is forced to a trimmed string and length-capped to the column
 * width, so an oversized or non-string payload can't reach the database layer.
 */
export function coerceApplication(body: unknown): ApplicationFields {
  const source = (body ?? {}) as Record<string, unknown>;
  const out = { ...EMPTY_APPLICATION };
  for (const key of Object.keys(EMPTY_APPLICATION) as (keyof ApplicationFields)[]) {
    const raw = source[key];
    out[key] = typeof raw === "string" ? raw.trim().slice(0, 200) : "";
  }
  return out;
}
