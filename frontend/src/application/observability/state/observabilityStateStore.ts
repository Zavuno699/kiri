import type {
  ObservabilityState,
} from "../contracts/observabilityState";

let state: ObservabilityState = {
  selectedTraceId:
    null,
  selectedEntityId:
    null,
  selectedDomain:
    null,
  auditIds:
    [],
  spanIds:
    [],
  telemetryIds:
    [],
  healthIds:
    [],
  anomalyIds:
    [],
  loading:
    false,
  error:
    null,
};

const listeners = new Set<
  () => void
>();

export function getObservabilityState(): ObservabilityState {
  return {
    ...state,
    auditIds: [
      ...state.auditIds,
    ],
    spanIds: [
      ...state.spanIds,
    ],
    telemetryIds: [
      ...state.telemetryIds,
    ],
    healthIds: [
      ...state.healthIds,
    ],
    anomalyIds: [
      ...state.anomalyIds,
    ],
  };
}

export function setObservabilityState(
  patch:
    Partial<ObservabilityState>,
): void {
  state = {
    ...state,
    ...patch,
  };

  for (
    const listener of
      listeners
  ) {
    listener();
  }
}

export function subscribeObservability(
  listener: () => void,
): () => void {
  listeners.add(
    listener,
  );

  return () => {
    listeners.delete(
      listener,
    );
  };
}
