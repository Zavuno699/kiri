export interface LiveRuntimeState {
  connected: boolean
  connectedAt: string | null
  lastMessageAt: string | null
}

let state: LiveRuntimeState = {
  connected: false,
  connectedAt: null,
  lastMessageAt: null,
}

export function getLiveRuntimeState() {
  return { ...state }
}

export function setLiveConnection(
  connected: boolean,
) {
  state = {
    ...state,
    connected,
    connectedAt: connected
      ? new Date().toISOString()
      : state.connectedAt,
  }

  return getLiveRuntimeState()
}
