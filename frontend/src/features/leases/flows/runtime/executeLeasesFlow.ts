import {
  writeLeasesFlow,
} from "../commands/writeLeasesFlow";

export async function executeLeasesFlow<
  TResult = unknown,
>(
  command: unknown,
): Promise<TResult> {
  return writeLeasesFlow<TResult>(
    command,
  );
}
