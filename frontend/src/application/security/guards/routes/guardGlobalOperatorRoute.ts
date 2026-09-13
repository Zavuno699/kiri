import {
  requireCapability,
} from "../requireCapability";

export function guardGlobalOperatorRoute(): void {
  requireCapability(
    "operator.global.control",
  );
}
