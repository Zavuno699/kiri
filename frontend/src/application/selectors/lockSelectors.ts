export interface LockLike {
  state: string
  readiness: string
}

export function lockedCount(
  locks: LockLike[],
): number {
  return locks.filter(
    (lock) => lock.state === "locked",
  ).length
}

export function commandReadyCount(
  locks: LockLike[],
): number {
  return locks.filter(
    (lock) =>
      lock.readiness === "ready" &&
      lock.state !== "jammed" &&
      lock.state !== "offline",
  ).length
}
