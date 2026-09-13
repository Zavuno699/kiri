export type PolicyEffect =
  | "allow"
  | "deny"
  | "conditional";

export interface PolicyDefinition {
  id: string;
  domain: string;
  name: string;
  label: string;
  description: string;
  effect: PolicyEffect;
  enabled: boolean;
  priority: number;
}
