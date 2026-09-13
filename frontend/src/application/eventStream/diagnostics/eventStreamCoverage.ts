import {
  getEventStreamDiagnostics,
} from "./eventStreamDiagnostics";

export function getEventStreamCoverage() {
  const diagnostics =
    getEventStreamDiagnostics();

  return {
    eventDefinitions:
      diagnostics.eventDefinitionCount,
    projections:
      diagnostics.projectionCount,
    commandEventLinks:
      diagnostics.commandEventLinkCount,
    eventProjectionLinks:
      diagnostics.eventProjectionLinkCount,
    streamRecords:
      diagnostics.streamRecordCount,
    traceabilityReady:
      diagnostics.commandEventLinkCount >
        0 &&
      diagnostics.eventProjectionLinkCount >
        0,
    ready:
      diagnostics.eventDefinitionCount >=
        10 &&
      diagnostics.projectionCount >=
        6 &&
      diagnostics.commandEventLinkCount >=
        8 &&
      diagnostics.eventProjectionLinkCount >=
        8,
  };
}
