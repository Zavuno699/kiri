import {
  requireCapability,
} from "../../../application/security/guards/requireCapability";

export function requirePropertiesWrite(): void {
  requireCapability(
    "properties.write",
  );
}
