import type { CompensationPlan } from "./compensationPlan"

export async function executeCompensation(
  plan: CompensationPlan,
  execute: (step: string) => Promise<unknown>,
): Promise<void> {
  if (!plan.enabled) {
    return
  }

  for (const step of plan.steps) {
    await execute(step)
  }
}
