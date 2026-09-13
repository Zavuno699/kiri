export interface PageAction {
  id: string
  label: string
  enabled?: boolean
}

export function getVisiblePageActions(
  actions: PageAction[] = [],
): PageAction[] {
  return actions.filter((action) => action.enabled !== false)
}
