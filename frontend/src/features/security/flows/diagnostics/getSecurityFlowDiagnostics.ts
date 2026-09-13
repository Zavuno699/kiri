export function getSecurityFlowDiagnostics() {
  return {
    domain:
      "security",

    readCapability:
      "security.read",

    writeCapability:
      "security.control",

    commandCapability:
      "recovery.execute",
  };
}
