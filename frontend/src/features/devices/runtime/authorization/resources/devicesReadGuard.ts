import {
  requireCapability,
} from "../../../../../application/security/guards/requireCapability";

export function requireDevicesResourceRead(): void {
  requireCapability(
    "devices.read",
  );
}
