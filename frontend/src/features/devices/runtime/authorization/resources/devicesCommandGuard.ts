import {
  requireCapability,
} from "../../../../../application/security/guards/requireCapability";

export function requireDevicesResourceCommand(): void {
  requireCapability(
    "devices.command",
  );
}
