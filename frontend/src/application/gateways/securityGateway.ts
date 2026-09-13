import type {
  SecuritySummary,
} from "../../features/security/types/security"

export interface SecurityGateway {
  getSummary(): Promise<SecuritySummary>
}
