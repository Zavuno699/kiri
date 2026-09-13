export interface WorkspaceAction {
  id: string
  label: string
  enabled?: boolean
  execute?: () => void | Promise<void>
}

export function getAvailableWorkspaceActions(
  domain: string,
): WorkspaceAction[] {
  return [
    {
      id: `${domain}.refresh`,
      label: "Refresh",
      enabled: true,
    },
  ]
}
