export interface RuntimeResourceClientRegistration {
  id: string
  domain: string
  initialized: boolean
}

export function createRuntimeResourceClientRegistry() {
  return new Map<
    string,
    RuntimeResourceClientRegistration
  >()
}
