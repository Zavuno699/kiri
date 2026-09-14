import {
  flowProjection,
} from "../../../../application/flows/state/flowProjection";

export function projectLeasesFlow(
  payload: unknown,
): void {
  flowProjection(
    "leases",
    payload,
  );
}
