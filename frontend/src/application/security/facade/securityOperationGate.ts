import { securityRuntimeFacade } from "./securityRuntimeFacade";

export function requireAuthorizedOperation(
  capability: string,
): void {
  if (!securityRuntimeFacade.authorized(capability)) {
    throw new Error("authorization-denied");
  }
}
