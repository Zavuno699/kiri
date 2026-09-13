export interface OperatorSelectionState {
  activeEntityType?: string
  activeEntityId?: string
}

export function getActiveEntity(
  state: OperatorSelectionState,
) {
  if (
    !state.activeEntityType ||
    !state.activeEntityId
  ) {
    return null
  }

  return {
    type: state.activeEntityType,
    id: state.activeEntityId,
  }
}
