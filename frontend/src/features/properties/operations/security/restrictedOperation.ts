
export interface RestrictedPropertiesOperation {
  allowed: false;
  reason: string;
}

export function restrictedPropertiesOperation(
  reason: string,
): RestrictedPropertiesOperation {
  return {
    allowed: false,
    reason,
  };
}

