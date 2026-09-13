export interface PolicyEnforcementResult {
  allowed: boolean;
  effect: "allow" | "deny";
  reason: string;
  capability: string;
}
