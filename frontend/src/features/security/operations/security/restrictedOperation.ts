
export interface RestrictedSecurityOperation {
  allowed: false;
  reason: string;
}

export function restrictedSecurityOperation(
  reason: string,
): RestrictedSecurityOperation {
  return {
    allowed: false,
    reason,
  };
}

