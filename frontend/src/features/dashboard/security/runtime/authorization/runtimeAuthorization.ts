export interface DashboardRuntimeAuthorization {
  readable: boolean;
  writable: boolean;
  commandable: boolean;
  reason: string | null;
}

export function createDashboardRuntimeAuthorization(
  readable: boolean,
  writable: boolean,
  commandable: boolean,
  reason: string | null,
): DashboardRuntimeAuthorization {
  return {
    readable,
    writable,
    commandable,
    reason,
  };
}
