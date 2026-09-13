import {
  requireCapability,
} from "../../security/guards/requireCapability";

export function authorizeDispatch(
  capability?: string,
): void {
  if (!capability) {
    return;
  }

  requireCapability(
    capability,
  );
}
