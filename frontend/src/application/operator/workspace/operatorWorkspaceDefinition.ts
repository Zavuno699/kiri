import type { OperatorPanel } from "../panels/operatorPanel"

export interface OperatorWorkspaceDefinition {
  id: string
  title: string
  domain: string
  panels: OperatorPanel[]
}
