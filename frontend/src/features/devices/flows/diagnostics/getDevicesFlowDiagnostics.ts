export function getDevicesFlowDiagnostics() {
  return {
    domain:
      "devices",

    readCapability:
      "devices.read",

    writeCapability:
      "devices.write",

    commandCapability:
      "devices.command",
  };
}
