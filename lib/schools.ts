import "server-only";

/**
 * Server-side registry of every school that can take an application fee.
 *
 * This file is the whole reason the rebuild exists. The legacy form put the
 * fee in a `readonly` input and the handler read it straight back off the
 * request (`$FEE = $_REQUEST['fee']`), so anyone could post `fee=1` and the
 * gateway would charge ₹1. That produced 8,837 one-rupee transactions against
 * live merchant accounts, in bursts of 4,112 and 3,531 on single days.
 *
 * Nothing here may ever be derived from user input. The client sends a school
 * KEY; the amount, the merchant account and the callback are all looked up
 * here, server-side, and the client's own idea of the fee is discarded.
 */

/** Atom merchant accounts. Three accounts serve six school entries. */
export type MerchantId = "jawahar" | "cambridge" | "durgapura";

export interface Merchant {
  /** Atom `login`. Not secret on its own, but paired with a secret below. */
  loginEnv: string;
  passwordEnv: string;
  requestHashKeyEnv: string;
  responseHashKeyEnv: string;
  /** Which callback path Atom posts the result back to. */
  callbackPath: string;
}

export const MERCHANTS: Record<MerchantId, Merchant> = {
  jawahar: {
    loginEnv: "ATOM_JAWAHAR_LOGIN",
    passwordEnv: "ATOM_JAWAHAR_PASSWORD",
    requestHashKeyEnv: "ATOM_JAWAHAR_REQ_KEY",
    responseHashKeyEnv: "ATOM_JAWAHAR_RES_KEY",
    callbackPath: "/api/payment/callback/jawahar",
  },
  cambridge: {
    loginEnv: "ATOM_CAMBRIDGE_LOGIN",
    passwordEnv: "ATOM_CAMBRIDGE_PASSWORD",
    requestHashKeyEnv: "ATOM_CAMBRIDGE_REQ_KEY",
    responseHashKeyEnv: "ATOM_CAMBRIDGE_RES_KEY",
    callbackPath: "/api/payment/callback/cambridge",
  },
  durgapura: {
    loginEnv: "ATOM_DURGAPURA_LOGIN",
    passwordEnv: "ATOM_DURGAPURA_PASSWORD",
    requestHashKeyEnv: "ATOM_DURGAPURA_REQ_KEY",
    responseHashKeyEnv: "ATOM_DURGAPURA_RES_KEY",
    callbackPath: "/api/payment/callback/durgapura",
  },
};

/**
 * Grade sets, transcribed from the legacy form.
 *
 * The old `admission-online.php` filtered its class dropdown by school using
 * CSS classes on each `<option>` — a parent picking Wonderland Kids only saw
 * Play Group through Prep, while Cambridge campuses saw the IGCSE track. That
 * behaviour is preserved here as real data rather than a jQuery show/hide.
 */
const EARLY_YEARS = ["Play Group", "LKG", "UKG", "Prep"] as const;

const CBSE_GRADES = [
  "Class 1", "Class 2", "Class 3", "Class 4", "Class 5",
  "Class 6", "Class 7", "Class 8", "Class 9", "Class 11",
] as const;

const CAMBRIDGE_SHARED = [
  "Cambridge Primary 1", "Cambridge Primary 2", "Cambridge Primary 3",
  "Cambridge Primary 4", "Cambridge Primary 5",
  "Lower Secondary 1( Grade 6)", "Lower Secondary 2( Grade 7)",
  "Lower Secondary 3( Grade 8)",
] as const;

/** IGCSE runs at Jawahar Nagar only, matching the legacy `sia-cb` filter. */
const IGCSE = ["IGCSE 1 ( Grade 9)", "IGCSE 2 ( Grade 10)"] as const;

export interface School {
  /** Stable key used in URLs (`?school=sps-cbse`) and stored against the row. */
  key: string;
  /** Display name shown to the parent. */
  label: string;
  /**
   * Exact string written to `tb_online_form.school`. Kept identical to what
   * the legacy form posted so existing reports and `admission_form_view.php`
   * keep grouping rows the same way.
   */
  legacyName: string;
  /** Application fee in whole rupees. The only authority on the amount. */
  feeInr: number;
  merchant: MerchantId;
  /** Which school site this entry is reached from, for theming and return links. */
  origin: string;
  /** Brand accent, so the shared form renders in the school's own identity. */
  theme: "sps" | "smhs" | "cambridge" | "swkl";
  /** Grades this campus actually admits to. */
  grades: readonly string[];
}

/**
 * Fees and merchant routing transcribed from the legacy `admission-online.php`
 * dropdown and `admission_submit_new.php` branch chain.
 *
 * NOTE — two entries below (`smia`, `swkl-durgapura`) route to the Jawahar
 * Nagar account even though both are Durgapura campuses. That mirrors current
 * live behaviour rather than fixing it: the legacy handler has a branch that
 * *intends* to send them to Durgapura, but compares against a school string the
 * dropdown never emits, so the branch is dead and they fall through to Jawahar.
 * Flagged for the accounts team; do not "correct" without confirming where the
 * money is actually expected to settle.
 */
export const SCHOOLS: readonly School[] = [
  {
    key: "sps-cbse",
    label: "Seedling Public School (CBSE), Jawahar Nagar",
    legacyName: "Seedling Public School (CBSE), Jawahar Nagar, Jaipur",
    feeInr: 1050,
    merchant: "jawahar",
    origin: "https://sps.seedlingschools.com",
    theme: "sps",
    grades: CBSE_GRADES,
  },
  {
    key: "swkl-jawahar",
    label: "Seedling Wonderland Kids League, Jawahar Nagar",
    legacyName: "Seedling Wonderland Kids League (Jawahar Nagar)",
    feeInr: 900,
    merchant: "jawahar",
    origin: "https://sps.seedlingschools.com",
    theme: "swkl",
    grades: EARLY_YEARS,
  },
  {
    key: "smhs-cbse",
    label: "Seedling Modern High School (CBSE), Durgapura",
    legacyName: "Seedling Modern High School (CBSE), Durgapura, Jaipur",
    feeInr: 1050,
    merchant: "durgapura",
    origin: "https://smhs.seedlingschools.com",
    theme: "smhs",
    grades: CBSE_GRADES,
  },
  {
    key: "swkl-durgapura",
    label: "Seedling Wonderland Kids League, Durgapura",
    legacyName: "Seedling Wonderland Kids League (Durgapura)",
    feeInr: 900,
    merchant: "jawahar", // see NOTE above — mirrors current live routing
    origin: "https://smhs.seedlingschools.com",
    theme: "swkl",
    grades: EARLY_YEARS,
  },
  {
    key: "sia-cambridge",
    label: "Seedling International Academy (Cambridge), Jawahar Nagar",
    legacyName:
      "Seedling International Academy, Jawahar Nagar, Jaipur (Cambridge Board)",
    feeInr: 1250,
    merchant: "cambridge",
    origin: "https://cambridge.seedlingschools.com",
    theme: "cambridge",
    grades: [...CAMBRIDGE_SHARED, ...IGCSE],
  },
  {
    key: "smia",
    label: "Seedling Modern International Academy, Durgapura",
    legacyName: "Seedling Modern International Academy, Durgapura, Jaipur",
    feeInr: 1250,
    merchant: "jawahar", // see NOTE above — mirrors current live routing
    origin: "https://cambridge.seedlingschools.com",
    theme: "cambridge",
    grades: CAMBRIDGE_SHARED,
  },
] as const;

/** Look up a school by its key. Returns undefined for anything unrecognised. */
export function findSchool(key: string | undefined | null): School | undefined {
  if (!key) return undefined;
  return SCHOOLS.find((s) => s.key === key);
}

/**
 * Resolve the fee for a school key, server-side.
 *
 * Callers must use this and never a client-supplied amount — that is the
 * entire fix for the ₹1 card-testing hole.
 */
export function resolveFee(key: string): number | undefined {
  return findSchool(key)?.feeInr;
}

/** Read a merchant's credentials from the environment at call time. */
export function merchantCredentials(id: MerchantId) {
  const m = MERCHANTS[id];
  const read = (name: string) => {
    const v = process.env[name];
    if (!v) throw new Error(`Missing required environment variable: ${name}`);
    return v;
  };
  return {
    login: read(m.loginEnv),
    password: read(m.passwordEnv),
    requestHashKey: read(m.requestHashKeyEnv),
    responseHashKey: read(m.responseHashKeyEnv),
    callbackPath: m.callbackPath,
  };
}

/** Grades a parent can apply for, mirroring the legacy dropdown. */
export const GRADES = [
  "Play Group",
  "Nursery",
  "LKG",
  "UKG",
  ...[
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI",
    "XII",
  ].map((n) => `Class ${n}`),
] as const;
