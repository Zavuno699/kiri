
export interface RestrictedLocksOperation {
  allowed: false;
  reason: string;
}

export function restrictedLocksOperation(
  reason: string,
): RestrictedLocksOperation {
  return {
    allowed: false,
    reason,
  };
}

