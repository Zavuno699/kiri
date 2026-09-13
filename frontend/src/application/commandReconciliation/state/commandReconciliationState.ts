export interface CommandReconciliationState {
  pending: number
  succeeded: number
  failed: number
  lastRunAt: string | null
}

const state: CommandReconciliationState = {
  pending: 0,
  succeeded: 0,
  failed: 0,
  lastRunAt: null,
}

export function getCommandReconciliationState() {
  return { ...state }
}

export function updateCommandReconciliationState(
  patch: Partial<CommandReconciliationState>,
) {
  Object.assign(state, patch)
  return getCommandReconciliationState()
}
