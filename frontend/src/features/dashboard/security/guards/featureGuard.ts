
import { capabilityAllowed } from '../../../../application/security/guards/authorizationGuard';

export function dashboardFeatureAllowed(): boolean {
  return capabilityAllowed('dashboard.read');
}

