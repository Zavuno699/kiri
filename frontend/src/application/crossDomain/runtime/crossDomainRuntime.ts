export interface CrossDomainRuntimeState {
  initialized: boolean
  registeredDomains: string[]
}

let state: CrossDomainRuntimeState = {
  initialized: false,
  registeredDomains: [],
}

export function getCrossDomainRuntimeState() {
  return {
    ...state,
    registeredDomains: [
      ...state.registeredDomains,
    ],
  }
}

export function initializeCrossDomainRuntime(
  domains: string[] = [],
) {
  state = {
    initialized: true,
    registeredDomains: [...domains],
  }

  return getCrossDomainRuntimeState()
}
