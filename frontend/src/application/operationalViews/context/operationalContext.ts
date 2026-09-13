import type {
  OperationalEntityView,
} from "../contracts/operationalEntityView";

export interface OperationalContext {
  property:
    OperationalEntityView | null;
  lease:
    OperationalEntityView | null;
  payment:
    OperationalEntityView | null;
  device:
    OperationalEntityView | null;
  lock:
    OperationalEntityView | null;
  security:
    OperationalEntityView | null;
}

export const emptyOperationalContext: OperationalContext = {
  property:
    null,
  lease:
    null,
  payment:
    null,
  device:
    null,
  lock:
    null,
  security:
    null,
};
