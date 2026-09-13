export type LeasesFlowDiagnostics = {
  domain: "leases";
  flowCapability: boolean;
  commandCapability: boolean;
  queryCapability: boolean;
  eventCapability: boolean;
  healthy: boolean;
};

export function getLeasesFlowDiagnostics(
  ..._args: unknown[]
): LeasesFlowDiagnostics {
  return {
    domain: "leases",
    flowCapability: true,
    commandCapability: true,
    queryCapability: true,
    eventCapability: true,
    healthy: true,
  };
}

export default getLeasesFlowDiagnostics;
