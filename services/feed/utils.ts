import type { CompanySize } from "./types";

export function switchCompanySize(companySize: number): CompanySize;
export function switchCompanySize(companySize: CompanySize): number;
export function switchCompanySize(
  companySize: CompanySize | number
): CompanySize | number {
  if (typeof companySize === "number") {
    switch (companySize) {
      case 0:
        return "startup";
      case 1:
        return "small";
      case 2:
        return "medium";
      case 3:
        return "large";
      case 4:
        return "foreign";
      default:
        throw new Error("Invalid company size");
    }
  }

  switch (companySize) {
    case "startup":
      return 0;
    case "small":
      return 1;
    case "medium":
      return 2;
    case "large":
      return 3;
    case "foreign":
      return 4;
    default:
      throw new Error("Invalid company size");
  }
}
