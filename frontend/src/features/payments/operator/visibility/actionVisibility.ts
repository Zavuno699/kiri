import { actionAllowed } from "../../../../application/operatorActions/guards/actionGuard";

export function paymentsActionVisible(): boolean {
  return actionAllowed("payment.operate");
}
