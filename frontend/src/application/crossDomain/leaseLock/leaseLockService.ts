import type {
  CrossDomainContext,
  CrossDomainResult,
} from "../contracts/crossDomainService";

export interface LeaseLockInput {
  leaseId: string;
  lockId: string;
}

export async function authorizeLeaseLock(
  input: LeaseLockInput,
  context?: CrossDomainContext,
): Promise<CrossDomainResult> {
  if (!input.leaseId || !input.lockId) {
    return {
      success: false,
      value: null,
      reason: "lease-and-lock-identifiers-required",
    };
  }

  void context;

  return {
    success: true,
    value: {
      leaseId: input.leaseId,
      lockId: input.lockId,
      authorized: true,
    },
    reason: null,
  };
}
