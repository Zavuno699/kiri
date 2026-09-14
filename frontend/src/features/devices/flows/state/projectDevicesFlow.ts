import {
  flowProjection,
} from "../../../../application/flows/state/flowProjection";

export function projectDevicesFlow(
  payload: unknown,
): void {
  flowProjection(
    "devices",
    payload,
  );
}
