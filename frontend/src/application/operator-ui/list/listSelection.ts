export interface ListSelection {
  selectedIds: string[]
}

export function createListSelection(
  ids: string[] = [],
): ListSelection {
  return {
    selectedIds: [...ids],
  }
}
