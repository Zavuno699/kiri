import type {
  ApplicationService,
} from "../../../application/services/service"
import type {
  SecuritySummary,
} from "../types/security"

export class SecuritySummaryService
  implements
    ApplicationService<
      undefined,
      SecuritySummary
    >
{
  execute(): Promise<SecuritySummary> {
    return Promise.reject(
      new Error(
        "Security application service unavailable: production HTTP ingress is not verified.",
      ),
    )
  }
}
