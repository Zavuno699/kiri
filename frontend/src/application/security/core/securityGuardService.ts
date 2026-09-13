import {
  requireCapability,
} from "../guards/requireCapability";

export function guardCapability(
  capability: string,
): void {
  requireCapability(
    capability,
  );
}
