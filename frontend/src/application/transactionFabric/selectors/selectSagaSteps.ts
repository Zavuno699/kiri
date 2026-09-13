import {
  listSagaStepStates,
} from "../sagas/sagaStepStore";

export function selectSagaSteps(
  transactionId: string,
) {
  return listSagaStepStates(
    transactionId,
  );
}
