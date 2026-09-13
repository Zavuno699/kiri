export interface DataFabricState {
  entities: number
  relationships: number
  refreshedAt: string | null
}

let state: DataFabricState = {
  entities: 0,
  relationships: 0,
  refreshedAt: null,
}

export function getDataFabricState() {
  return { ...state }
}

export function setDataFabricState(
  patch: Partial<DataFabricState>,
) {
  state = {
    ...state,
    ...patch,
  }

  return getDataFabricState()
}
