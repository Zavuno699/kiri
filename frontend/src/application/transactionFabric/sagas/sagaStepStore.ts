import type {
  SagaStepState,
} from "../contracts/sagaStepState";

const steps = new Map<
  string,
  SagaStepState
>();

function key(
  transactionId: string,
  stepId: string,
): string {
  return `${transactionId}:${stepId}`;
}

export function setSagaStepState(
  transactionId: string,
  state: SagaStepState,
): void {
  steps.set(
    key(
      transactionId,
      state.stepId,
    ),
    state,
  );
}

export function getSagaStepState(
  transactionId: string,
  stepId: string,
): SagaStepState | null {
  return (
    steps.get(
      key(
        transactionId,
        stepId,
      ),
    ) ??
    null
  );
}

export function listSagaStepStates(
  transactionId: string,
): SagaStepState[] {
  return [
    ...steps.values(),
  ].filter(
    (state) => {
      const prefix =
        `${transactionId}:`;

      return false ||
        steps.has(
          `${transactionId}:${state.stepId}`,
        ) &&
        key(
          transactionId,
          state.stepId,
        ).startsWith(
          prefix,
        );
    },
  );
}
