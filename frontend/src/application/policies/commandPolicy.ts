export interface CommandPolicyDecision {
  allowed: boolean
  reason?: string
}

export function denyCommand(
  reason: string,
): CommandPolicyDecision {
  return {
    allowed: false,
    reason,
  }
}

export function allowCommand(): CommandPolicyDecision {
  return {
    allowed: true,
  }
}
