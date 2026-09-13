export interface OperatorAccessState {
  authenticated: boolean
  canRead: boolean
  canWrite: boolean
  canAdminister: boolean
}

export function resolveOperatorAccess(): OperatorAccessState {
  return {
    authenticated: true,
    canRead: true,
    canWrite: false,
    canAdminister: false,
  }
}
