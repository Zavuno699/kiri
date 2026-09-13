import {
  requireCapability,
} from "../../../../../application/security/guards/requireCapability";

export function requirePropertiesResourceRead(): void {
  requireCapability(
    "properties.read",
  );
}
