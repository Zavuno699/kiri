export interface SecurityRuntimeAuthorization {
  readable: boolean;
  writable: boolean;
  commandable: boolean;
  reason: string | null;
}

export function createSecurityRuntimeAuthorization(
  readable: boolean,
  writable: boolean,
  commandable: boolean,
  reason: string | null,
): SecurityRuntimeAuthorization {
  return {
    readable,
    writable,
    commandable,
    reason,
  };
}
