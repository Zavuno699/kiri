export interface LockRuntime {
  domain: "locks"
  started: boolean
  readOnly: boolean
}

export const lockRuntime: LockRuntime = {
  domain: "locks",
  started: false,
  readOnly: true,
}
