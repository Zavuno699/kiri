export function getLocksFlowDiagnostics() {
  return {
    domain:
      "locks",

    readCapability:
      "locks.read",

    writeCapability:
      "locks.write",

    commandCapability:
      "locks.command",
  };
}
