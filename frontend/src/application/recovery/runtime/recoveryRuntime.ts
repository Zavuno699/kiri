export type RecoveryResult = {
  recovered: boolean;
  domain?: string;
  reason?: string;
};

export function recover(
  domain?: string,
): RecoveryResult {
  return {
    recovered: Boolean(domain),
    domain,
    reason: domain
      ? undefined
      : "Recovery domain not specified",
  };
}

export function recoverFromFailure(
  domain?: string,
): RecoveryResult {
  return {
    recovered: Boolean(domain),
    domain,
    reason: domain
      ? undefined
      : "Recovery from failure requires domain",
  };
}
