import {
  refreshDomainHealth,
} from "./domainHealthRuntime";

export function registerDomainHealthRuntime(): void {
  refreshDomainHealth();
}
