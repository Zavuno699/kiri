export interface RuntimeResourceDefinition {
  key: string
  domain: string
  cacheable: boolean
  refreshable: boolean
}

export const runtimeResourceDefinitions:
  RuntimeResourceDefinition[] = [
  "dashboard",
  "property",
  "lease",
  "payment",
  "device",
  "lock",
  "security",
].map((domain) => ({
  key: `${domain}:list`,
  domain,
  cacheable: true,
  refreshable: true,
}))
