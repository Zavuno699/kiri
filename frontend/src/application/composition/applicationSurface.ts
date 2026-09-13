export interface ApplicationSurface {
  id: string
  label: string
  domain: string
  route: string
  enabled: boolean
  readOnly: boolean
}

export function createApplicationSurface(
  input: ApplicationSurface,
): ApplicationSurface {
  return { ...input }
}
