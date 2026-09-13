export type LeaseProjection = {
  id: string;
  propertyId: string;
  tenantId: string;
  status: string;
  balance: number;
  dueAt?: string;
  version: number;
  updatedAt: string;
};
