
export interface PolicyDecision {
  allowed: boolean;
  effect: "allow" | "deny";
  reason: string;
  policy?: string;
}

