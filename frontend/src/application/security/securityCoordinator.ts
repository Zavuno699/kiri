import {
  securityContract,
} from "../../features/security/services/securityContract"

export function createSecurityCoordinator() {
  return {
    contract: securityContract,

    async getSummary(): Promise<never> {
      throw new Error(
        "Security HTTP ingress is not yet verified.",
      )
    },

    async getCredentials(): Promise<never[]> {
      throw new Error(
        "Security credential HTTP ingress is not yet verified.",
      )
    },

    async getAccess(): Promise<never[]> {
      throw new Error(
        "Security access HTTP ingress is not yet verified.",
      )
    },

    async getEvents(): Promise<never[]> {
      throw new Error(
        "Security event HTTP ingress is not yet verified.",
      )
    },
  }
}
