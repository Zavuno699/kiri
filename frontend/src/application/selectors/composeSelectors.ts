export function composeSelectors<T>(
  selectors: Array<(value: T) => unknown>,
) {
  return (value: T) =>
    selectors.map((selector) => selector(value))
}
