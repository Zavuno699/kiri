import {
  requireCapability,
} from "../../../application/security/guards/requireCapability";

export function requireDevicesWrite(): void {
  requireCapability(
    "devices.write",
  );
}
