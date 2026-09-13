export interface SecurityRuntime {
  domain: "security"
  started: boolean
  readOnly: boolean
}

export const securityRuntime: SecurityRuntime = {
  domain: "security",
  started: false,
  readOnly: true,
}
