import type {
  TransitionRequest,
} from "../contracts/transitionRequest";

import {
  executeTransition,
} from "./executeTransition";

import {
  auditTransition,
} from "./auditTransition";

export function executeAndAuditTransition(
  request: TransitionRequest,
) {
  const result =
    executeTransition(
      request,
    );

  const auditId =
    auditTransition(
      request.domain,
      result,
    );

  return {
    result,
    auditId,
  };
}
