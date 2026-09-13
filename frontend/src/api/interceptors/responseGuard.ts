import type { ApiErrorShape } from "../../types/api/apiError"

export async function assertApiResponse(
  response: Response,
): Promise<void> {
  if (response.ok) return

  let payload: ApiErrorShape | undefined

  try {
    payload = (await response.json()) as ApiErrorShape
  } catch {
    payload = undefined
  }

  throw new Error(
    payload?.message ??
      `API request failed with status ${response.status}`,
  )
}
