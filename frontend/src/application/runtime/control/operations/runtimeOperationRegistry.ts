import type {
  RuntimeOperation,
} from "./runtimeOperation";

const operations:
  RuntimeOperation[] = [
    "start",
    "stop",
    "safe-mode",
    "recover",
    "refresh",
    "reconcile",
    "invalidate-cache",
    "reconnect-realtime",
  ];

export function listRuntimeOperations(): RuntimeOperation[] {
  return [
    ...operations,
  ];
}

export function isRuntimeOperation(
  value: string,
): value is RuntimeOperation {
  return operations.includes(
    value as RuntimeOperation,
  );
}
