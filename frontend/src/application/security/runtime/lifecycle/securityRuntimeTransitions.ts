import {
  getSecurityRuntimeState,
  setSecurityRuntimeState,
} from "../securityRuntimeStore"

export function freezeSecurityRuntime() {
  return setSecurityRuntimeState({ frozen: true })
}

export function unfreezeSecurityRuntime() {
  const state = getSecurityRuntimeState()

  return setSecurityRuntimeState({
    frozen: false,
    authorizationReady:
      state.identity.authenticated &&
      state.session.session !== null &&
      state.permissions !== null,
  })
}
