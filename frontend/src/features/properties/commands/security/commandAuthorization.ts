export type PropertiesCommandAuthorizationDecision = {
  authorized: boolean;
  reason: string;
};

export function commandAuthorization(
  ..._args: unknown[]
): PropertiesCommandAuthorizationDecision {
  return {
    authorized: false,
    reason: "Authorization context not established",
  };
}

export default commandAuthorization;
