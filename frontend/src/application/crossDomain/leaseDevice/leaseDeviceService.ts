import type {
  CrossDomainContext,
  CrossDomainResult,
} from "../contracts/crossDomainService";

export interface LeaseDeviceInput {
  leaseId: string;
  deviceId: string;
}

export async function authorizeLeaseDevice(
  input: LeaseDeviceInput,
  context?: CrossDomainContext,
): Promise<CrossDomainResult> {
  if (!input.leaseId || !input.deviceId) {
    return {
      success: false,
      value: null,
      reason: "lease-and-device-identifiers-required",
    };
  }

  void context;

  return {
    success: true,
    value: {
      leaseId: input.leaseId,
      deviceId: input.deviceId,
      authorized: true,
    },
    reason: null,
  };
}
