
import { capabilityAllowed } from '../../../application/security/guards/authorizationGuard';

export const leasesAuthorization = {
  read: () => capabilityAllowed('leases.read'),
  write: () => capabilityAllowed('leases.write'),
  command: () => capabilityAllowed('leases.command'),
};

