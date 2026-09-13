
export interface RestrictedLeasesOperation {
  allowed: false;
  reason: string;
}

export function restrictedLeasesOperation(
  reason: string,
): RestrictedLeasesOperation {
  return {
    allowed: false,
    reason,
  };
}

