
import { capabilityAllowed } from '../../../application/security/guards/authorizationGuard';

export const propertiesAuthorization = {
  read: () => capabilityAllowed('properties.read'),
  write: () => capabilityAllowed('properties.write'),
  command: () => capabilityAllowed('properties.command'),
};

