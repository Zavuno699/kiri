export interface LeasesRuntimeAuthorization {
  readable: boolean;
  writable: boolean;
  commandable: boolean;
  reason: string | null;
}

export function createLeasesRuntimeAuthorization(
  readable: boolean,
  writable: boolean,
  commandable: boolean,
  reason: string | null,
): LeasesRuntimeAuthorization {
  return {
    readable,
    writable,
    commandable,
    reason,
  };
}
