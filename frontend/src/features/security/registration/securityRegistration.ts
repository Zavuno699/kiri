export interface SecurityRegistration {
  id: "security"
  registered: boolean
  readOnly: boolean
}

export const securityRegistration: SecurityRegistration = {
  id: "security",
  registered: true,
  readOnly: true,
}
