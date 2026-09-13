export function nowIso(): string {
  return new Date().toISOString()
}

export function elapsedMs(
  startedAt: string,
): number {
  const started =
    new Date(startedAt).getTime()

  if (Number.isNaN(started)) {
    return 0
  }

  return Math.max(
    0,
    Date.now() - started,
  )
}
