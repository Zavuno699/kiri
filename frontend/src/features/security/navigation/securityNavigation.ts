export interface SecurityNavigation {
  label: string
  path: string
  enabled: boolean
}

export const securityNavigation: SecurityNavigation = {
  label: "Security",
  path: "/security",
  enabled: false,
}
