import {
  registerStateSlice,
} from "./stateSliceRegistry";

const domains = [
  "dashboard",
  "properties",
  "leases",
  "payments",
  "devices",
  "locks",
  "security",
] as const;

export function registerCanonicalStateSlices(): void {
  for (
    const domain of domains
  ) {
    registerStateSlice({
      key:
        domain,
      domain,
      data:
        null,
      version:
        0,
      updatedAt:
        null,
    });
  }
}
