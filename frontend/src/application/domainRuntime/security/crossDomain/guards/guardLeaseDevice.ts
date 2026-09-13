import {
  requireCapability,
} from "../../../../security/guards/requireCapability";

export function guardLeaseDeviceAuthorization(): void {
  requireCapability(
    "devices.command",
  );
}
