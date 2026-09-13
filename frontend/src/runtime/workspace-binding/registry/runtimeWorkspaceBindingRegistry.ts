export interface RuntimeWorkspaceBindingDefinition {
  id: string
  domain: string
  pageId: string
  enabled: boolean
}

export const runtimeWorkspaceBindingDefinitions:
  RuntimeWorkspaceBindingDefinition[] = [
  {
    id: "dashboard.workspace",
    domain: "dashboard",
    pageId: "dashboard.workspace",
    enabled: true,
  },
  {
    id: "property.workspace",
    domain: "property",
    pageId: "property.workspace",
    enabled: true,
  },
  {
    id: "lease.workspace",
    domain: "lease",
    pageId: "lease.workspace",
    enabled: true,
  },
  {
    id: "payment.workspace",
    domain: "payment",
    pageId: "payment.workspace",
    enabled: true,
  },
  {
    id: "device.workspace",
    domain: "device",
    pageId: "device.workspace",
    enabled: true,
  },
  {
    id: "lock.workspace",
    domain: "lock",
    pageId: "lock.workspace",
    enabled: false,
  },
  {
    id: "security.workspace",
    domain: "security",
    pageId: "security.workspace",
    enabled: false,
  },
]
