
import { capabilityAllowed } from '../../../../application/security/guards/authorizationGuard';

export function leasesFeatureAllowed(): boolean {
  return capabilityAllowed('leases.read');
}

