
export interface LeasesSecuritySelection {
  readable: boolean;
  writable: boolean;
  commandable: boolean;
}

export function selectLeasesSecurity(
  readable: boolean,
  writable: boolean,
  commandable: boolean,
): LeasesSecuritySelection {
  return {
    readable,
    writable,
    commandable,
  };
}

