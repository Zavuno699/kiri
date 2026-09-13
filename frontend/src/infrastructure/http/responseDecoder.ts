export async function decodeJson<T>(
  response: Response,
): Promise<T> {
  const contentType =
    response.headers.get("content-type") ?? ""

  if (!contentType.includes("application/json")) {
    throw new Error(
      "Expected a JSON API response.",
    )
  }

  return (await response.json()) as T
}
