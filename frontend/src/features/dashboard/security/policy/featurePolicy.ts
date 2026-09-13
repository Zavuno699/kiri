
export interface DashboardFeaturePolicy {
  readable: boolean;
  writable: boolean;
  commandable: boolean;
}

export function defaultDashboardFeaturePolicy(): DashboardFeaturePolicy {
  return {
    readable: false,
    writable: false,
    commandable: false,
  };
}

