import {
  requireCapability,
} from "../requireCapability";

export function guardDeviceCommand(): void {
  requireCapability(
    "devices.command",
  );
}
