import {
  requireCapability,
} from "../../../../../application/security/guards/requireCapability";

export function requireDevicesResourceWrite(): void {
  requireCapability(
    "devices.write",
  );
}
