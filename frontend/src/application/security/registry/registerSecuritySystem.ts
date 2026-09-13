import {
  initializeSecurityRuntime,
} from "../runtime/initializeSecurityRuntime";

export function registerSecuritySystem(): void {
  initializeSecurityRuntime();
}
