export function select<T, R>(
  value: T,
  selector: (value: T) => R,
): R {
  return selector(value)
}
