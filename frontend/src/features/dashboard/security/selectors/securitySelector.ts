
export interface DashboardSecuritySelection {
  readable: boolean;
  writable: boolean;
  commandable: boolean;
}

export function selectDashboardSecurity(
  readable: boolean,
  writable: boolean,
  commandable: boolean,
): DashboardSecuritySelection {
  return {
    readable,
    writable,
    commandable,
  };
}

