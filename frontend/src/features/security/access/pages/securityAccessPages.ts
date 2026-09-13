export interface SecurityAccessPage {
  key: string
  title: string
  path: string
  enabled: boolean
}

export const securityAccessPages:
  SecurityAccessPage[] = [
    {
      key: "security-overview",
      title: "Security",
      path: "/security",
      enabled: true,
    },
    {
      key: "security-audit",
      title: "Security Audit",
      path: "/security/audit",
      enabled: true,
    },
  ]
