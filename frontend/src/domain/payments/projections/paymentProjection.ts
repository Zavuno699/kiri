export type PaymentProjection = {
  id: string;
  leaseId: string;
  status: string;
  amount: number;
  currency: string;
  settledAt?: string;
  version: number;
  updatedAt: string;
};
