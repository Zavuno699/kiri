export type DevicesCommandAuthorizationDecision = {
  authorized: boolean;
  reason: string;
};

export function commandAuthorization(
  ..._args: unknown[]
): DevicesCommandAuthorizationDecision {
  return {
    authorized: false,
    reason: "Authorization context not established",
  };
}

export default commandAuthorization;
