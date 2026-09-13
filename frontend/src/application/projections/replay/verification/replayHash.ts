export function stableReplayFingerprint(
  projectionKey: string,
  sequence: number,
  version: number,
  entityCount: number,
): string {
  return [
    projectionKey,
    sequence,
    version,
    entityCount,
  ].join("|");
}
