
export interface AccessDecision {
  id: string;
  principal: string | null;
  capability: string;
  decision: "allow" | "deny" | "challenge" | "expired";
  reason: string;
  resourceType?: string;
  resourceId?: string | null;
  occurredAt: string;
}

