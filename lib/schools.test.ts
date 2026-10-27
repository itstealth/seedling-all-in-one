import { describe, expect, it } from "vitest";
import { MERCHANTS, SCHOOLS, findSchool, resolveFee } from "./schools";

describe("school registry", () => {
  it("has a unique key per campus", () => {
    const keys = SCHOOLS.map((s) => s.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("routes every school to a merchant that actually exists", () => {
    for (const school of SCHOOLS) {
      expect(Object.keys(MERCHANTS)).toContain(school.merchant);
    }
  });

  it("carries the fees the legacy dropdown charged", () => {
    expect(resolveFee("sps-cbse")).toBe(1050);
    expect(resolveFee("smhs-cbse")).toBe(1050);
    expect(resolveFee("sia-cambridge")).toBe(1250);
    expect(resolveFee("smia")).toBe(1250);
    expect(resolveFee("swkl-jawahar")).toBe(900);
    expect(resolveFee("swkl-durgapura")).toBe(900);
  });

  it("keeps legacy school names exact so existing reports still group rows", () => {
    expect(findSchool("sps-cbse")?.legacyName).toBe(
      "Seedling Public School (CBSE), Jawahar Nagar, Jaipur"
    );
    expect(findSchool("sia-cambridge")?.legacyName).toBe(
      "Seedling International Academy, Jawahar Nagar, Jaipur (Cambridge Board)"
    );
  });

  it("charges a real fee for every campus — no zero or negative amounts", () => {
    for (const school of SCHOOLS) {
      expect(school.feeInr).toBeGreaterThan(0);
      expect(Number.isInteger(school.feeInr)).toBe(true);
    }
  });
});

describe("resolveFee — the card-testing fix", () => {
  it("refuses an unknown school rather than defaulting to a chargeable amount", () => {
    // The legacy handler fell through to a default merchant for any unmatched
    // school string; here an unknown key resolves to nothing and the caller
    // rejects the request.
    expect(resolveFee("not-a-school")).toBeUndefined();
    expect(resolveFee("")).toBeUndefined();
  });

  it("ignores anything that looks like a client-supplied amount", () => {
    // There is deliberately no code path that accepts a fee argument.
    expect(resolveFee("sps-cbse")).toBe(1050);
    // @ts-expect-error — proving the signature takes only a key
    expect(resolveFee("sps-cbse", 1)).toBe(1050);
  });
});

describe("findSchool", () => {
  it("returns undefined for null-ish input instead of throwing", () => {
    expect(findSchool(undefined)).toBeUndefined();
    expect(findSchool(null)).toBeUndefined();
    expect(findSchool("")).toBeUndefined();
  });
});

describe("grade sets per campus", () => {
  it("gives Wonderland only the early years", () => {
    expect(findSchool("swkl-jawahar")?.grades).toEqual([
      "Play Group", "LKG", "UKG", "Prep",
    ]);
    expect(findSchool("swkl-durgapura")?.grades).toEqual([
      "Play Group", "LKG", "UKG", "Prep",
    ]);
  });

  it("gives the CBSE campuses Class 1-9 and 11, matching the legacy dropdown", () => {
    const sps = findSchool("sps-cbse")?.grades ?? [];
    expect(sps).toContain("Class 1");
    expect(sps).toContain("Class 9");
    expect(sps).toContain("Class 11");
    // Class 10 and 12 were commented out of the legacy form — mid-board intake.
    expect(sps).not.toContain("Class 10");
    expect(sps).not.toContain("Class 12");
  });

  it("runs IGCSE at Jawahar Nagar only, as the legacy sia-cb filter did", () => {
    expect(findSchool("sia-cambridge")?.grades).toContain("IGCSE 1 ( Grade 9)");
    expect(findSchool("smia")?.grades).not.toContain("IGCSE 1 ( Grade 9)");
  });

  it("never offers a CBSE grade at a Cambridge campus, or vice versa", () => {
    expect(findSchool("sia-cambridge")?.grades).not.toContain("Class 5");
    expect(findSchool("sps-cbse")?.grades).not.toContain("Cambridge Primary 1");
  });

  it("gives every campus at least one grade", () => {
    for (const s of SCHOOLS) expect(s.grades.length).toBeGreaterThan(0);
  });
});
