import {
  getCommandQueryDiagnostics,
} from "./commandQueryDiagnostics";

export function getCommandQueryCoverage() {
  const diagnostics =
    getCommandQueryDiagnostics();

  return {
    commands:
      diagnostics.commandCount,
    queries:
      diagnostics.queryCount,
    history:
      diagnostics.historyCount,
    ready:
      diagnostics.commandCount >=
        8 &&
      diagnostics.queryCount >=
        6,
  };
}
