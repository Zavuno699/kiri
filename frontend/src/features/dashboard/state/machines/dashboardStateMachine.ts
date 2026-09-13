import type { DashboardState } from "../dashboardState"

export interface DashboardStateMachine {
  state: DashboardState
  transition(
    next: DashboardState,
  ): DashboardState
}

export function createDashboardStateMachine():
  DashboardStateMachine {
  let state: DashboardState = "unknown"

  return {
    get state() {
      return state
    },

    transition(next) {
      state = next
      return state
    },
  }
}
