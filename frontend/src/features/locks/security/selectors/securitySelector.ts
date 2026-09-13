
export interface LocksSecuritySelection {
  readable: boolean;
  writable: boolean;
  commandable: boolean;
}

export function selectLocksSecurity(
  readable: boolean,
  writable: boolean,
  commandable: boolean,
): LocksSecuritySelection {
  return {
    readable,
    writable,
    commandable,
  };
}

