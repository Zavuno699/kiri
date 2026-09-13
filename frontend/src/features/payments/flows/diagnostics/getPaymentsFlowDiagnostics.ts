export type PaymentsFlowDiagnostics = {
  domain: "payments";
  flowCapability: boolean;
  commandCapability: boolean;
  queryCapability: boolean;
  eventCapability: boolean;
  healthy: boolean;
};

export function getPaymentsFlowDiagnostics(
  ..._args: unknown[]
): PaymentsFlowDiagnostics {
  return {
    domain: "payments",
    flowCapability: true,
    commandCapability: true,
    queryCapability: true,
    eventCapability: true,
    healthy: true,
  };
}

export default getPaymentsFlowDiagnostics;
