
export interface SecuritySecuritySelection {
  readable: boolean;
  writable: boolean;
  commandable: boolean;
}

export function selectSecuritySecurity(
  readable: boolean,
  writable: boolean,
  commandable: boolean,
): SecuritySecuritySelection {
  return {
    readable,
    writable,
    commandable,
  };
}

