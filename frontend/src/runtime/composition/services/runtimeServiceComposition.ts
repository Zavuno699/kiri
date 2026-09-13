export interface RuntimeServiceComposition {
  domain: string
  registered: boolean
  readOnly: boolean
}

export const runtimeServiceCompositions:
  RuntimeServiceComposition[] = [
  "dashboard",
  "property",
  "lease",
  "payment",
  "device",
  "lock",
  "security",
].map((domain) => ({
  domain,
  registered: true,
  readOnly: true,
}))
