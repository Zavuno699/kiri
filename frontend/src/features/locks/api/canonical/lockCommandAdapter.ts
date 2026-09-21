import {
  apiFetch,
} from "../../../../api/client";

export async function sendLockCommand<
  TResult = unknown,
>(
  lockId: string,
  operation: "lock" | "unlock",
): Promise<TResult> {
  const response =
    await apiFetch<TResult>("/locks/command", {
      method: "POST",
      body: JSON.stringify({
        lock_id: lockId,
        operation: operation,
      }),
    }, {
      useIdentityService: true,
    });

  return response;
}
