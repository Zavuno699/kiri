export interface PaymentsRuntimeAuthorization {
  readable: boolean;
  writable: boolean;
  commandable: boolean;
  reason: string | null;
}

export function createPaymentsRuntimeAuthorization(
  readable: boolean,
  writable: boolean,
  commandable: boolean,
  reason: string | null,
): PaymentsRuntimeAuthorization {
  return {
    readable,
    writable,
    commandable,
    reason,
  };
}
