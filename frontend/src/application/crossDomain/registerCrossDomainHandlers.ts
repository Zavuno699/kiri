import {
  registerCommandHandler,
} from "../handlers/canonical/registry/commandHandlerRegistry";

import {
  registerQueryHandler,
} from "../handlers/canonical/registry/queryHandlerRegistry";

import {
  registerEventHandler,
} from "../handlers/canonical/registry/eventHandlerRegistry";

import {
  reconcileLeasePaymentHandler,
} from "./handlers/commands/reconcileLeasePaymentHandler";

import {
  authorizeLeaseDeviceHandler,
} from "./handlers/commands/authorizeLeaseDeviceHandler";

import {
  authorizeLeaseLockHandler,
} from "./handlers/commands/authorizeLeaseLockHandler";

import {
  recoverSecurityHandler,
} from "./handlers/commands/recoverSecurityHandler";

import {
  getOperationalStateHandler,
} from "./handlers/queries/getOperationalStateHandler";

import {
  getOperatorControlHandler,
} from "./handlers/queries/getOperatorControlHandler";

import {
  paymentSettledHandler,
} from "./handlers/events/paymentSettledHandler";

import {
  securityStateChangedHandler,
} from "./handlers/events/securityStateChangedHandler";

export function registerCrossDomainHandlers(): void {
  registerCommandHandler(
    reconcileLeasePaymentHandler,
  );

  registerCommandHandler(
    authorizeLeaseDeviceHandler,
  );

  registerCommandHandler(
    authorizeLeaseLockHandler,
  );

  registerCommandHandler(
    recoverSecurityHandler,
  );

  registerQueryHandler(
    getOperationalStateHandler,
  );

  registerQueryHandler(
    getOperatorControlHandler,
  );

  registerEventHandler(
    paymentSettledHandler,
  );

  registerEventHandler(
    securityStateChangedHandler,
  );
}
