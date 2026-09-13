import type {
  SagaDefinition,
} from "../contracts/sagaDefinition";

const sagas = new Map<
  string,
  SagaDefinition
>();

export function registerSaga(
  saga: SagaDefinition,
): void {
  sagas.set(
    saga.id,
    saga,
  );
}

export function getSaga(
  sagaId: string,
): SagaDefinition | null {
  return (
    sagas.get(
      sagaId,
    ) ??
    null
  );
}

export function listSagas(): SagaDefinition[] {
  return [
    ...sagas.values(),
  ];
}

export function listSagasForTransaction(
  transactionId: string,
): SagaDefinition[] {
  return listSagas().filter(
    (saga) =>
      saga.transactionId ===
      transactionId,
  );
}
