import {
  evaluateAuthorization,
} from "./evaluateAuthorization";

export function requireAuthorization(
  capability: string,
): void {
  const decision =
    evaluateAuthorization(
      capability,
    );

  if (
    decision.decision !==
    "allow"
  ) {
    throw new Error(
      `Authorization denied: ${decision.reason}`,
    );
  }
}
