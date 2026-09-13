import {
  sendCanonicalCommand,
} from "../runtime/sendCanonicalCommand";

export async function dispatchResourceCommand<
  TResult = unknown,
>(
  command: unknown,
  capability: string,
): Promise<TResult> {
  const response =
    await sendCanonicalCommand<TResult>(
      command,
      capability,
    );

  return response.data as TResult;
}
