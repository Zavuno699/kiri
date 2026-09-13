export function failClosed(
  reason: string,
): never {
  throw new Error(
    `FAIL_CLOSED: ${reason}`,
  );
}
