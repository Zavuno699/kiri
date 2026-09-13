import {
  initializeSecurityRuntime,
} from "./initializeSecurityRuntime";

let started = false;

export function startSecurityRuntimeOnce(): void {
  if (started) {
    return;
  }

  started = true;

  initializeSecurityRuntime();
}
