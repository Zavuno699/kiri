export type PropertiesFlowDiagnostics = {
  domain: "properties";
  flowCapability: boolean;
  commandCapability: boolean;
  queryCapability: boolean;
  eventCapability: boolean;
  healthy: boolean;
};

export function getPropertiesFlowDiagnostics(
  ..._args: unknown[]
): PropertiesFlowDiagnostics {
  return {
    domain: "properties",
    flowCapability: true,
    commandCapability: true,
    queryCapability: true,
    eventCapability: true,
    healthy: true,
  };
}

export default getPropertiesFlowDiagnostics;
