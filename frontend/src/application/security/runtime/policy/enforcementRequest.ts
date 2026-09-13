export interface PolicyEnforcementRequest {
  capability: string;
  principal: string | null;
  authenticated: boolean;
  sessionActive: boolean;
  frozen: boolean;
  resourceType?: string;
  resourceId?: string | null;
  mutating?: boolean;
  dangerous?: boolean;
}
