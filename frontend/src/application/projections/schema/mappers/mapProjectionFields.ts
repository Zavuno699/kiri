export function mapProjectionFields(
  state: Record<string, unknown>,
  aliases: Record<string, string>,
): Record<string, unknown> {
  const result = {
    ...state,
  };

  for (const [source, target] of Object.entries(aliases)) {
    if (
      result[target] === undefined &&
      result[source] !== undefined
    ) {
      result[target] = result[source];
    }
  }

  return result;
}
