export type LocksCommandAuthorizationDecision = {
  authorized: boolean;
  reason: string;
};

export function commandAuthorization(
  ..._args: unknown[]
): LocksCommandAuthorizationDecision {
  return {
    authorized: false,
    reason: "Authorization context not established",
  };
}

export default commandAuthorization;
