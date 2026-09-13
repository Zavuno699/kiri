
import { capabilityAllowed } from '../../../application/security/guards/authorizationGuard';

export const locksAuthorization = {
  read: () => capabilityAllowed('locks.read'),
  write: () => capabilityAllowed('locks.write'),
  command: () => capabilityAllowed('locks.command'),
};

