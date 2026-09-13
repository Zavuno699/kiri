
export interface AuthorizationRequest {
  principal: string | null;
  capability: string;
  resourceType?: string;
  resourceId?: string | null;
  reason?: string;
}

