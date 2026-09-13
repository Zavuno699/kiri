export interface SecurityNavigationItem {
  key: string
  path: string
  enabled: boolean
}

export const securityAccessNavigation:
  SecurityNavigationItem[] = [
    {
      key: "security",
      path: "/security",
      enabled: true,
    },
    {
      key: "security-audit",
      path: "/security/audit",
      enabled: true,
    },
  ]
