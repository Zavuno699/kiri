
export interface RestrictedDevicesOperation {
  allowed: false;
  reason: string;
}

export function restrictedDevicesOperation(
  reason: string,
): RestrictedDevicesOperation {
  return {
    allowed: false,
    reason,
  };
}

