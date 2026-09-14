import {
  flowProjection,
} from "../../../../application/flows/state/flowProjection";

export function projectSecurityFlow(
  payload: unknown,
): void {
  flowProjection(
    "security",
    payload,
  );
}
