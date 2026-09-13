import {
  getStateMachineDiagnostics,
} from "./stateMachineDiagnostics";

export function getStateMachineCoverage() {
  const diagnostics =
    getStateMachineDiagnostics();

  return {
    states:
      diagnostics.stateCount,

    transitions:
      diagnostics.transitionCount,

    guards:
      diagnostics.guardCount,

    invariants:
      diagnostics.invariantCount,

    entities:
      diagnostics.entityStateCount,

    history:
      diagnostics.historyCount,

    ready:
      diagnostics.stateCount >=
        15 &&
      diagnostics.transitionCount >=
        15 &&
      diagnostics.guardCount >=
        4 &&
      diagnostics.invariantCount >=
        4,
  };
}
