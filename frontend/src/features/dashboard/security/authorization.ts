
import { capabilityAllowed } from '../../../application/security/guards/authorizationGuard';

export const dashboardAuthorization = {
  read: () => capabilityAllowed('dashboard.read'),
  write: () => capabilityAllowed('dashboard.write'),
  command: () => capabilityAllowed('dashboard.command'),
};

