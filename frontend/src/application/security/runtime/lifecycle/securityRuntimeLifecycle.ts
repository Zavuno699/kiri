import {
  getSecurityRuntimeState,
  setSecurityRuntimeState,
  resetSecurityRuntimeState,
} from "../securityRuntimeStore"

export function initializeSecurityRuntime() {
  const state = getSecurityRuntimeState()

  return setSecurityRuntimeState({
    session: {
      ...state.session,
      initialized: true,
    },
    authorizationReady:
      state.identity.authenticated &&
      state.session.session !== null &&
      state.permissions !== null,
  })
}

export function shutdownSecurityRuntime() {
  return resetSecurityRuntimeState()
}
