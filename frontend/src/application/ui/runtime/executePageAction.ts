import {
  requireCapability,
} from "../../security/guards/requireCapability";

export async function executePageAction<T>(
  capability: string,
  operation: () => Promise<T>,
): Promise<T> {
  requireCapability(
    capability,
  );

  return operation();
}
