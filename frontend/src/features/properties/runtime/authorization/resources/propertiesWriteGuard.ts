import {
  requireCapability,
} from "../../../../../application/security/guards/requireCapability";

export function requirePropertiesResourceWrite(): void {
  requireCapability(
    "properties.write",
  );
}
