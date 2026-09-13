import type { IntegrityState } from "../state/integrityState";

export const selectIntegrityOverall = (
  state: IntegrityState,
) => state.overall;

export const selectIntegrityFailures = (
  state: IntegrityState,
) =>
  state.checks.filter(
    (check) => check.status === "fail",
  );

export const selectIntegrityWarnings = (
  state: IntegrityState,
) =>
  state.checks.filter(
    (check) => check.status === "warn",
  );
