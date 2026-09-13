import type {
  PolicyState,
} from "../contracts/policyState";

let state: PolicyState = {
  lastDecisionId:
    null,
  lastOutcome:
    null,
  decisionIds:
    [],
  loading:
    false,
  error:
    null,
};

const listeners = new Set<
  () => void
>();

export function getPolicyState(): PolicyState {
  return {
    ...state,
    decisionIds: [
      ...state.decisionIds,
    ],
  };
}

export function setPolicyState(
  patch:
    Partial<PolicyState>,
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

export function subscribePolicyState(
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
