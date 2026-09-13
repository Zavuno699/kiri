import {
  listRuntimeAuditEvents,
} from "../audit/runtimeAuditStore";

export function getRuntimeAuditDiagnostics() {
  return {
    eventCount:
      listRuntimeAuditEvents().length,

    recentEvents:
      listRuntimeAuditEvents().slice(-25),
  };
}
