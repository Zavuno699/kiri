import { paymentsActionVisible } from "../visibility/actionVisibility";

export function canUsePaymentsOperatorAction(): boolean {
  return paymentsActionVisible();
}
