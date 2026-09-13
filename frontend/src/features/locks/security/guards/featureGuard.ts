
import { capabilityAllowed } from '../../../../application/security/guards/authorizationGuard';

export function locksFeatureAllowed(): boolean {
  return capabilityAllowed('locks.read');
}

