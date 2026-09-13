import {
  requireCapability,
} from "../requireCapability";

export function guardCommandDispatch(
  capability: string,
): void {
  requireCapability(
    capability,
  );
}
