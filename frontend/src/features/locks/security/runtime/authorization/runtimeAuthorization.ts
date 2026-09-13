export interface LocksRuntimeAuthorization {
  readable: boolean;
  writable: boolean;
  commandable: boolean;
  reason: string | null;
}

export function createLocksRuntimeAuthorization(
  readable: boolean,
  writable: boolean,
  commandable: boolean,
  reason: string | null,
): LocksRuntimeAuthorization {
  return {
    readable,
    writable,
    commandable,
    reason,
  };
}
