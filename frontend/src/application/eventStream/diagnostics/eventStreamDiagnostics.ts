import {
  listEvents,
} from "../registry/eventRegistry";

import {
  listProjections,
} from "../registry/projectionRegistry";

import {
  listCommandEventLinks,
} from "../traceability/commandEventRegistry";

import {
  listEventProjectionLinks,
} from "../traceability/eventProjectionRegistry";

import {
  listEventRecords,
} from "../streams/eventStreamStore";

import {
  getEventStreamState,
} from "../state/eventStreamStateStore";

export function getEventStreamDiagnostics() {
  const records =
    listEventRecords();

  return {
    eventDefinitionCount:
      listEvents().length,

    projectionCount:
      listProjections().length,

    commandEventLinkCount:
      listCommandEventLinks().length,

    eventProjectionLinkCount:
      listEventProjectionLinks().length,

    streamRecordCount:
      records.length,

    acknowledgedCount:
      records.filter(
        (record) =>
          record.acknowledged,
      ).length,

    projectedCount:
      records.filter(
        (record) =>
          record.projected,
      ).length,

    state:
      getEventStreamState(),
  };
}
