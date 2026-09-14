export interface WorkspaceQueueItem {
  id: string
  domain: string
  action: string
  createdAt: string
}

const queue: WorkspaceQueueItem[] = []

export function addWorkspaceQueueItem(
  item: WorkspaceQueueItem,
): WorkspaceQueueItem {
  queue.push(item)
  return item
}

export function listWorkspaceQueueItems(): WorkspaceQueueItem[] {
  return [...queue]
}

export function clearWorkspaceQueue(): void {
  queue.length = 0
}
