import { securityRuntimeFacade } from "./securityRuntimeFacade";

export function requireSecurityReady(): void {
  if (!securityRuntimeFacade.ready()) {
    throw new Error(
      securityRuntimeFacade.restrictionReason() ??
        "security-runtime-not-ready",
    );
  }
}
