import type { WorkspaceSection } from "./workspaceSection"

export interface WorkspaceDefinition {
  id: string
  title: string
  domain: string
  sections: WorkspaceSection[]
}
