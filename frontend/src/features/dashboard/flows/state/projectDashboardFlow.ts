import {
  flowProjection,
} from "../../../../application/flows/state/flowProjection";

export function projectDashboardFlow(
  payload: unknown,
): void {
  flowProjection(
    "dashboard",
    payload,
  );
}
