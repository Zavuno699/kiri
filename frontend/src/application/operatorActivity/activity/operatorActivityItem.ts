export interface OperatorActivityItem {
  id: string;
  principal: string | null;
  action: string;
  category: string;
  outcome: string;
  occurredAt: string;
  capability?: string | null;
  resourceType?: string | null;
  resourceId?: string | null;
  correlationId?: string | null;
}
