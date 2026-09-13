export interface FilterState {
  values: Record<string, string | boolean | undefined>
}

export function emptyFilterState(): FilterState {
  return {
    values: {},
  }
}
