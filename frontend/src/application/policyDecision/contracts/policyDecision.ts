import type {
  RiskAssessment,
} from "./riskAssessment";

export type DecisionOutcome =
  | "allow"
  | "deny"
  | "conditional"
  | "blocked";

export interface PolicyDecision {
  id: string;
  action: string;
  domain: string;
  entityId: string | null;
  outcome: DecisionOutcome;
  allowed: boolean;
  reasons: string[];
  policyIds: string[];
  guardIds: string[];
  risk: RiskAssessment;
  evaluatedAt: string;
  correlationId: string | null;
}
