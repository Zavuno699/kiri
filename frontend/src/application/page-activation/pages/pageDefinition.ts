export interface PageDefinition {
  id: string
  domain: string
  route: string
  kind: "overview" | "list" | "detail" | "workspace"
  enabled: boolean
  readOnly: boolean
}
