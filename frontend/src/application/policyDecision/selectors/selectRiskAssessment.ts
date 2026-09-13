import {
  assessActionRisk,
} from "../risk/assessActionRisk";

export function selectRiskAssessment(
  action: string,
  domain: string,
  confirmed = false,
) {
  return assessActionRisk(
    action,
    domain,
    confirmed,
  );
}
