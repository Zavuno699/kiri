
import { capabilityAllowed } from '../../../../application/security/guards/authorizationGuard';

export function propertiesFeatureAllowed(): boolean {
  return capabilityAllowed('properties.read');
}

