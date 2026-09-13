import {
  flowProjection,
} from "../../../application/flows/state/flowProjection";

export function projectLocksFlow(
  payload: unknown,
): void {
  flowProjection(
    "locks",
    "locks",
    payload,
  );
}
