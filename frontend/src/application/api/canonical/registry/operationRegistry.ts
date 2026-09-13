import type {
  ApiOperationContract,
} from "../contracts/apiOperation";

const operations = new Map<
  string,
  ApiOperationContract
>();

export function registerApiOperation(
  operation: ApiOperationContract,
): void {
  operations.set(
    operation.key,
    operation,
  );
}

export function getApiOperation(
  key: string,
): ApiOperationContract | null {
  return operations.get(key) ?? null;
}

export function listApiOperations(): ApiOperationContract[] {
  return [...operations.values()];
}
