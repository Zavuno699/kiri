export type VersionRecoveryDecision =
  | "continue"
  | "migrate"
  | "rebuild"
  | "reject";

export function determineVersionRecovery(
  compatibility:
    | "compatible"
    | "migration-required"
    | "rebuild-required"
    | "unsupported",
): VersionRecoveryDecision {
  switch (compatibility) {
    case "compatible":
      return "continue";
    case "migration-required":
      return "migrate";
    case "rebuild-required":
      return "rebuild";
    default:
      return "reject";
  }
}
