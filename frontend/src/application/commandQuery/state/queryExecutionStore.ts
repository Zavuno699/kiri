import type {
  QueryExecutionState,
} from "../contracts/queryExecutionState";

let state: QueryExecutionState = {
  activeQueryId:
    null,
  entityId:
    null,
  status:
    "idle",
  message:
    null,
  startedAt:
    null,
  completedAt:
    null,
  durationMs:
    null,
};

const listeners = new Set<
  () => void
>();

export function getQueryExecutionState(): QueryExecutionState {
  return {
    ...state,
  };
}

export function setQueryExecutionState(
  patch:
    Partial<QueryExecutionState>,
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

export function subscribeQueryExecution(
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
