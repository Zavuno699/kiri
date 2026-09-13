import {
  requireCapability,
} from "../../../../security/guards/requireCapability";

export function guardSecurityDeviceAuthorization(): void {
  requireCapability(
    "devices.command",
  );
}
