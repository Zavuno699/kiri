
export interface PaymentsSecuritySelection {
  readable: boolean;
  writable: boolean;
  commandable: boolean;
}

export function selectPaymentsSecurity(
  readable: boolean,
  writable: boolean,
  commandable: boolean,
): PaymentsSecuritySelection {
  return {
    readable,
    writable,
    commandable,
  };
}

