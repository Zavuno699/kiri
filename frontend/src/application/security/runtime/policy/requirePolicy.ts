import { evaluateRuntimePolicy } from "./runtimePolicyEvaluator"

export function requirePolicy(
  capability: string,
  options: { mutating?: boolean; dangerous?: boolean } = {},
): void {
  const result = evaluateRuntimePolicy(capability, options)

  if (!result.allowed) {
    throw new Error(result.reason)
  }
}
