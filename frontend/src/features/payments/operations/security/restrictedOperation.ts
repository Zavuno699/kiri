
export interface RestrictedPaymentsOperation {
  allowed: false;
  reason: string;
}

export function restrictedPaymentsOperation(
  reason: string,
): RestrictedPaymentsOperation {
  return {
    allowed: false,
    reason,
  };
}

