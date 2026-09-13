
export interface PolicyResource {
  type: string;
  id: string | null;
  tenantId?: string | null;
  attributes?: Record<string, unknown>;
}

