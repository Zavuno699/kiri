import {
  listAuditEvents,
} from "./../../audit/store/auditStore";

import {
  buildAccessReview,
} from "../review/accessReview";

import {
  buildCommandReview,
} from "../review/commandReview";

import {
  buildOperatorReview,
} from "../review/operatorReview";

export function getAuditRuntimeSnapshot() {
  const events = listAuditEvents();

  return {
    events,
    access: buildAccessReview(events),
    commands: buildCommandReview(events),
    operators: buildOperatorReview(events),
  };
}
