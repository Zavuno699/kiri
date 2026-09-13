export type SecurityCommandAuthorizationDecision = {
  authorized: boolean;
  reason: string;
};

export function commandAuthorization(
  ..._args: unknown[]
): SecurityCommandAuthorizationDecision {
  return {
    authorized: false,
    reason: "Authorization context not established",
  };
}

export default commandAuthorization;
