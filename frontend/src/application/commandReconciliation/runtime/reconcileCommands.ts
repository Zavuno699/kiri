import {
  updateCommandReconciliationState,
} from "../state/commandReconciliationState"

export async function reconcileCommands(): Promise<void> {
  updateCommandReconciliationState({
    lastRunAt: new Date().toISOString(),
  })
}
