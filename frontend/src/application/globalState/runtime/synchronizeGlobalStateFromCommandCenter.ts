import {
  getCommandCenterState,
} from "../../commandCenter/state/commandCenterStore";

import {
  updateGlobalState,
} from "../state/globalStateStore";

export function synchronizeGlobalStateFromCommandCenter(): void {
  const commandCenter =
    getCommandCenterState();

  updateGlobalState({
    incidentCount:
      commandCenter.criticalCount +
      commandCenter.warningCount +
      commandCenter.infoCount,

    recoveryCount:
      commandCenter.activeRecoveryId
        ? 1
        : 0,

    degraded:
      commandCenter.status ===
      "degraded",

    operational:
      commandCenter.status ===
        "operational" ||
      commandCenter.status ===
        "recovery",
  });
}
