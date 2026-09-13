import type {
  ResourceListResponse,
} from "../contracts/response/resourceListResponse";

export function normalizeResourceList<T>(
  value: unknown,
): ResourceListResponse<T> {
  if (
    value &&
    typeof value ===
      "object" &&
    "items" in value
  ) {
    const source =
      value as {
        items?: unknown;
        total?: unknown;
      };

    return {
      items:
        Array.isArray(
          source.items,
        )
          ? (source.items as T[])
          : [],
      total:
        typeof source.total ===
        "number"
          ? source.total
          : null,
    };
  }

  if (
    Array.isArray(value)
  ) {
    return {
      items:
        value as T[],
      total:
        value.length,
    };
  }

  return {
    items: [],
    total: 0,
  };
}
