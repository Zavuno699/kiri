import type {
  PageAction,
} from "../contracts/pageAction";

export const paymentsPageActions: PageAction[] = [
  {
    key:
      "payments.create",
    label:
      "Create payment",
    capability:
      "payments.write",
    dangerous:
      false,
    enabled:
      true,
  },
  {
    key:
      "payments.reconcile",
    label:
      "Reconcile",
    capability:
      "payments.write",
    dangerous:
      true,
    enabled:
      true,
  },
];
