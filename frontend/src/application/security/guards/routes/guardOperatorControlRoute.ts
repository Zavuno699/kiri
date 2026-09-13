import {
  requireCapability,
} from "../requireCapability";

export function guardOperatorControlRoute(): void {
  requireCapability(
    "operator.control",
  );
}
