import {
  evaluateAuthorization,
} from "./evaluateAuthorization";

export function canAuthorize(
  capability: string,
): boolean {
  return (
    evaluateAuthorization(
      capability,
    ).decision === "allow"
  );
}
