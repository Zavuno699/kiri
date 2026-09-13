import {
  requireCapability,
} from "../../../application/security/guards/requireCapability";

export function requirePropertiesRead(): void {
  requireCapability(
    "properties.read",
  );
}
