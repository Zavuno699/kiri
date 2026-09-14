import {
  requireCapability,
} from "../../../../application/security/guards/requireCapability";

export function requireDevicesRead(): void {
  requireCapability(
    "devices.read",
  );
}
