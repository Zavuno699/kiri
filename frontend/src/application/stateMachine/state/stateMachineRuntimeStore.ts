import type {
  TransitionResult,
} from "../contracts/transitionResult";

interface StateMachineRuntime {
  active: boolean;
  lastResult:
    | TransitionResult
    | null;
}

let state:
  StateMachineRuntime = {
    active:
      false,
    lastResult:
      null,
  };

const listeners = new Set<
  () => void
>();

export function getStateMachineRuntime(): StateMachineRuntime {
  return {
    ...state,
  };
}

export function setStateMachineRuntime(
  patch:
    Partial<StateMachineRuntime>,
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

export function subscribeStateMachineRuntime(
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
