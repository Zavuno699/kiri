export type TransactionRisk =
  | "low"
  | "medium"
  | "high"
  | "critical";

export interface TransactionDefinition {
  id: string;
  name: string;
  label: string;
  description: string;
  domains: string[];
  risk: TransactionRisk;
  transactional: boolean;
  idempotent: boolean;
  recoverable: boolean;
  enabled: boolean;
}
