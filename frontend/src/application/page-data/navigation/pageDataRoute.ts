export interface PageDataRoute {
  id: string
  domain: string
  path: string
  page: "list" | "detail" | "overview" | "workspace"
  enabled: boolean
}
