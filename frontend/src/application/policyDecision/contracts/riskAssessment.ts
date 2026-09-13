export type RiskLevel =
  | "none"
  | "low"
  | "medium"
  | "high"
  | "critical";

export interface RiskAssessment {
  level: RiskLevel;
  score: number;
  factors: string[];
  requiresConfirmation: boolean;
  requiresElevation: boolean;
  rationale: string;
}
