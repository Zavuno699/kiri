export interface RuntimeControllerComposition {
  domain: string
  registered: boolean
  enabled: boolean
}

export const runtimeControllerCompositions:
  RuntimeControllerComposition[] = [
  {
    domain: "dashboard",
    registered: true,
    enabled: true,
  },
  {
    domain: "property",
    registered: true,
    enabled: true,
  },
  {
    domain: "lease",
    registered: true,
    enabled: true,
  },
  {
    domain: "payment",
    registered: true,
    enabled: true,
  },
  {
    domain: "device",
    registered: true,
    enabled: true,
  },
  {
    domain: "lock",
    registered: true,
    enabled: false,
  },
  {
    domain: "security",
    registered: true,
    enabled: false,
  },
]
