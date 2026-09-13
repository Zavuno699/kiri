export interface LockRegistration {
  id: "locks"
  registered: boolean
  readOnly: boolean
}

export const lockRegistration: LockRegistration = {
  id: "locks",
  registered: true,
  readOnly: true,
}
