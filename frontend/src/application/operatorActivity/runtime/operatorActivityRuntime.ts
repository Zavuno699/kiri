import {
  listAuditEvents,
} from "../../audit/store/auditStore";

import {
  projectOperatorActivity,
} from "../activity/operatorActivityProjector";

import {
  setOperatorActivityState,
} from "../state/operatorActivityStore";

export function refreshOperatorActivity(): void {
  setOperatorActivityState({
    initialized: true,
    items: projectOperatorActivity(
      listAuditEvents(),
    ),
    loading: false,
    error: null,
  });
}
