export function createApiRequestId(): string {
  return (
    `frontend-${Date.now()}-` +
    Math.random()
      .toString(36)
      .slice(2)
  );
}
