
import { capabilityAllowed } from '../../../../application/security/guards/authorizationGuard';

export function paymentsFeatureAllowed(): boolean {
  return capabilityAllowed('payments.read');
}

