export function leaseDurationDays(
  start?: string,
  end?: string,
): number | undefined {
  if (!start || !end) return undefined

  const from = Date.parse(start)
  const to = Date.parse(end)

  if (!Number.isFinite(from) || !Number.isFinite(to)) {
    return undefined
  }

  return Math.max(
    0,
    Math.ceil(
      (to - from) /
      (24 * 60 * 60 * 1000),
    ),
  )
}
