export interface DashboardFlowRuntimeState {
  active: boolean
  lastStartedAt: string | null
  lastCompletedAt: string | null
}

let state: DashboardFlowRuntimeState = {
  active: false,
  lastStartedAt: null,
  lastCompletedAt: null,
}

export function getDashboardFlowRuntime() {
  return { ...state }
}

export function startDashboardFlow() {
  state = {
    ...state,
    active: true,
    lastStartedAt: new Date().toISOString(),
  }
  return getDashboardFlowRuntime()
}

export function finishDashboardFlow() {
  state = {
    ...state,
    active: false,
    lastCompletedAt: new Date().toISOString(),
  }
  return getDashboardFlowRuntime()
}
