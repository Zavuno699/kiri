export type DashboardFlowDiagnostics = {
  domain: "dashboard";
  flowCapability: boolean;
  commandCapability: boolean;
  queryCapability: boolean;
  eventCapability: boolean;
  healthy: boolean;
};

export function getDashboardFlowDiagnostics(
  ..._args: unknown[]
): DashboardFlowDiagnostics {
  return {
    domain: "dashboard",
    flowCapability: true,
    commandCapability: true,
    queryCapability: true,
    eventCapability: true,
    healthy: true,
  };
}

export default getDashboardFlowDiagnostics;
