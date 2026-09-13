import {
  getAuditState,
} from "../../audit/state/auditStore";

export interface SecurityMetrics {
  authenticationAttempts: number;
  authenticationFailures: number;
  authorizationChecks: number;
  authorizationDenials: number;
  commandAttempts: number;
  commandDenials: number;
  operatorActions: number;
}

export function getSecurityMetrics(): SecurityMetrics {
  const events = getAuditState().events;

  return {
    authenticationAttempts: events.filter(
      (event) =>
        event.category === "authentication",
    ).length,
    authenticationFailures: events.filter(
      (event) =>
        event.category === "authentication" &&
        event.outcome === "failed",
    ).length,
    authorizationChecks: events.filter(
      (event) =>
        event.category === "authorization",
    ).length,
    authorizationDenials: events.filter(
      (event) =>
        event.category === "authorization" &&
        event.outcome === "denied",
    ).length,
    commandAttempts: events.filter(
      (event) =>
        event.category === "command",
    ).length,
    commandDenials: events.filter(
      (event) =>
        event.category === "command" &&
        event.outcome === "denied",
    ).length,
    operatorActions: events.filter(
      (event) =>
        event.category === "operator",
    ).length,
  };
}
