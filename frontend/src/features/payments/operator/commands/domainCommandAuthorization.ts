import { actionAllowed } from "../../../../application/operatorActions/guards/actionGuard";

export function paymentsCommandAuthorized(): boolean {
  return actionAllowed("payment.operate");
}
