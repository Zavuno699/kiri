export interface LockServicePolicy {
  readable: boolean
  refreshable: boolean
  commandable: boolean
}

export const lockServicePolicy:
  LockServicePolicy = {
  readable: true,
  refreshable: true,
  commandable: true,
}
