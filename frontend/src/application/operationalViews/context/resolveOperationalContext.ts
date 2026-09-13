import {
  getOperationalEntity,
} from "../registry/operationalEntityRegistry";

import type {
  OperationalContext,
} from "./operationalContext";

export function resolveOperationalContext(
  ids: Partial<
    Record<
      keyof OperationalContext,
      string | null
    >
  >,
): OperationalContext {
  return {
    property:
      ids.property
        ? getOperationalEntity(
            ids.property,
          )
        : null,

    lease:
      ids.lease
        ? getOperationalEntity(
            ids.lease,
          )
        : null,

    payment:
      ids.payment
        ? getOperationalEntity(
            ids.payment,
          )
        : null,

    device:
      ids.device
        ? getOperationalEntity(
            ids.device,
          )
        : null,

    lock:
      ids.lock
        ? getOperationalEntity(
            ids.lock,
          )
        : null,

    security:
      ids.security
        ? getOperationalEntity(
            ids.security,
          )
        : null,
  };
}
