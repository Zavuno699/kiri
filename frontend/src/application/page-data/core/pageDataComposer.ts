export interface PageDataComposer {
  compose(
    sources: Record<string, unknown>,
  ): Record<string, unknown>
}

export function createPageDataComposer():
  PageDataComposer {
  return {
    compose(sources) {
      return {
        ...sources,
        composedAt: new Date().toISOString(),
      }
    },
  }
}
