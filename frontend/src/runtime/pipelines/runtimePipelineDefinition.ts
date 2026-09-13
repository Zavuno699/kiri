export interface RuntimePipelineDefinition {
  id: string
  domain: string
  kind: "command" | "query" | "event" | "sync" | "reconciliation"
  enabled: boolean
}
