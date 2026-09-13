import {
  flowProjection,
} from "../../../application/flows/state/flowProjection";

export function projectPropertiesFlow(
  payload: unknown,
): void {
  flowProjection(
    "properties",
    "properties",
    payload,
  );
}
