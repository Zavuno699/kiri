import {
  startCanonicalApplication,
} from "./canonical/startCanonicalApplication";

let started = false;

export function startFrontendApplication(): void {
  if (started) {
    return;
  }

  startCanonicalApplication();
  started = true;
}

export function frontendApplicationStarted(): boolean {
  return started;
}
