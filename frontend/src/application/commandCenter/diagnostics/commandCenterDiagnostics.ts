import {
  getCommandCenterState,
} from "../state/commandCenterStore";

import {
  listIncidents,
} from "../incidents/incidentStore";

import {
  listRecoveries,
} from "../recovery/recoveryStore";

import {
  listCommandCenterActions,
} from "../registry/commandCenterActionRegistry";

import {
  listIncidentTimeline,
} from "../incidents/incidentTimelineStore";

export function getCommandCenterDiagnostics() {
  return {
    state:
      getCommandCenterState(),

    incidentCount:
      listIncidents().length,

    recoveryCount:
      listRecoveries().length,

    actionCount:
      listCommandCenterActions().length,

    timelineCount:
      listIncidentTimeline().length,

    incidents:
      listIncidents(),

    recoveries:
      listRecoveries(),

    actions:
      listCommandCenterActions(),
  };
}
