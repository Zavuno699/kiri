
import { capabilityAllowed } from '../../../application/security/guards/authorizationGuard';

export const paymentsAuthorization = {
  read: () => capabilityAllowed('payments.read'),
  write: () => capabilityAllowed('payments.write'),
  command: () => capabilityAllowed('payments.command'),
};

