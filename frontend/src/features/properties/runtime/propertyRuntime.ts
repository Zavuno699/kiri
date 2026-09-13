export interface PropertyRuntime {
  domain: "properties"
  started: boolean
  readOnly: boolean
}

export const propertyRuntime: PropertyRuntime = {
  domain: "properties",
  started: false,
  readOnly: true,
}
