import {
  createPaymentsViewModel,
} from "../../../features/payments/ui/runtime/createPaymentsViewModel";

export function getPaymentsOperationalView() {
  return createPaymentsViewModel();
}
