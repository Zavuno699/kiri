
import { capabilityAllowed } from '../../../application/security/guards/authorizationGuard';

export const devicesAuthorization = {
  read: () => capabilityAllowed('devices.read'),
  write: () => capabilityAllowed('devices.write'),
  command: () => capabilityAllowed('devices.command'),
};

