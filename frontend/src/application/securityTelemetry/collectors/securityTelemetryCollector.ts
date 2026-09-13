import type { SecurityTelemetryEvent } from "../telemetryEvent";
import {
  getAuditState,
} from "../../audit/state/auditStore";

export function collectSecurityTelemetry(): SecurityTelemetryEvent[] {
  const events = getAuditState().events;

  const denied = events.filter(
    (event) => event.outcome === "denied",
  ).length;

  const commands = events.filter(
    (event) => event.category === "command",
  ).length;

  const authenticationFailures = events.filter(
    (event) =>
      event.category === "authentication" &&
      event.outcome === "failed",
  ).length;

  const now = new Date().toISOString();

  return [
    {
      name: "security.authorization.denied",
      value: denied,
      occurredAt: now,
      principal: null,
    },
    {
      name: "security.commands.observed",
      value: commands,
      occurredAt: now,
      principal: null,
    },
    {
      name: "security.authentication.failures",
      value: authenticationFailures,
      occurredAt: now,
      principal: null,
    },
  ];
}
