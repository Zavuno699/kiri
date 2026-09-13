
export interface PaymentsFeaturePolicy {
  readable: boolean;
  writable: boolean;
  commandable: boolean;
}

export function defaultPaymentsFeaturePolicy(): PaymentsFeaturePolicy {
  return {
    readable: false,
    writable: false,
    commandable: false,
  };
}

