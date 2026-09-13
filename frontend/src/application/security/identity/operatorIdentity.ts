
export interface OperatorIdentity {
  id: string;
  displayName: string;
  principal: string;
  tenantId?: string;
  organizationId?: string;
  authenticated: boolean;
  active: boolean;
}

