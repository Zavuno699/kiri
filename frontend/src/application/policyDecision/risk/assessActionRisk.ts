import type {
  RiskAssessment,
} from "../contracts/riskAssessment";

export function assessActionRisk(
  action: string,
  domain: string,
  _confirmed: boolean,
): RiskAssessment {
  const factors: string[] = [];

  let score =
    0;

  if (
    domain ===
    "security"
  ) {
    score +=
      80;

    factors.push(
      "security-control",
    );
  }

  if (
    domain ===
    "locks"
  ) {
    score +=
      60;

    factors.push(
      "physical-access",
    );
  }

  if (
    domain ===
    "devices"
  ) {
    score +=
      35;

    factors.push(
      "cyber-physical-device",
    );
  }

  if (
    action.includes(
      "freeze",
    ) ||
    action.includes(
      "release",
    ) ||
    action.includes(
      "secure",
    )
  ) {
    score +=
      15;

    factors.push(
      "state-transition",
    );
  }

  if (
    action.includes(
      "refresh",
    ) ||
    action.includes(
      "query",
    )
  ) {
    score =
      Math.max(
        0,
        score -
          30,
      );
  }

  const level =
    score >=
      90
      ? "critical"
      : score >=
          70
        ? "high"
        : score >=
            40
          ? "medium"
          : score > 0
            ? "low"
            : "none";

  return {
    level,
    score,
    factors,
    requiresConfirmation:
      level ===
        "high" ||
      level ===
        "critical",
    requiresElevation:
      level ===
        "critical",
    rationale:
      factors.length
        ? `Risk derived from ${factors.join(", ")}.`
        : "No elevated risk factors detected.",
  };
}
