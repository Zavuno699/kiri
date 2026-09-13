
import { capabilityAllowed } from '../../../../application/security/guards/authorizationGuard';

export function devicesFeatureAllowed(): boolean {
  return capabilityAllowed('devices.read');
}

