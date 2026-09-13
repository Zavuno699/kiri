
import { capabilityAllowed } from '../../../../application/security/guards/authorizationGuard';

export function securityFeatureAllowed(): boolean {
  return capabilityAllowed('security.read');
}

