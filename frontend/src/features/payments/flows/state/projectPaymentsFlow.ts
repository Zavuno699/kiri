import {
  flowProjection,
} from "../../../application/flows/state/flowProjection";

export function projectPaymentsFlow(
  payload: unknown,
): void {
  flowProjection(
    "payments",
    "payments",
    payload,
  );
}
