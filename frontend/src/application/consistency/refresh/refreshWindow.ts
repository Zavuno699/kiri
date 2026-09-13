export type RefreshWindow = {
  openedAt: string;
  closedAt?: string;
  maxConcurrent: number;
};

export function createRefreshWindow(
  maxConcurrent = 4,
  now = new Date(),
): RefreshWindow {
  return {
    openedAt: now.toISOString(),
    maxConcurrent,
  };
}
