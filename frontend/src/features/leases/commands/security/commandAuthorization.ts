export type LeasesCommandAuthorizationDecision = {
  authorized: boolean;
  reason: string;
};

export function commandAuthorization(
  ..._args: unknown[]
): LeasesCommandAuthorizationDecision {
  return {
    authorized: false,
    reason: "Authorization context not established",
  };
}

export default commandAuthorization;
