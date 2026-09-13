export interface SecurityAccessFeedback {
  allowed: boolean
  message: string
}

export function createSecurityAccessFeedback(
  allowed: boolean,
  message?: string,
): SecurityAccessFeedback {
  return {
    allowed,
    message:
      message ??
      (allowed ? "Access granted" : "Access denied"),
  }
}
