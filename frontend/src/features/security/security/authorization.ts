
import { capabilityAllowed } from '../../../application/security/guards/authorizationGuard';

export const securityAuthorization = {
  read: () => capabilityAllowed('security.read'),
  write: () => capabilityAllowed('security.write'),
  command: () => capabilityAllowed('security.command'),
};

