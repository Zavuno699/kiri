
export interface PolicySubject {
  principal: string | null;
  authenticated: boolean;
  tenantId: string | null;
  roles: string[];
}

