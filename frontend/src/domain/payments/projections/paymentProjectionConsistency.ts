export type PaymentProjectionConsistency = {
  paymentId: string;
  leaseVersion: number;
  paymentVersion: number;
  consistent: boolean;
};

export function isPaymentProjectionConsistent(
  leaseVersion: number,
  paymentVersion: number,
): boolean {
  return paymentVersion <= leaseVersion + 1;
}
