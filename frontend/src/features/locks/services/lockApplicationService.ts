import type {
  ApplicationService,
} from "../../../application/services/service"

export interface LockListRequest {
  search?: string
}

export class LockListService
  implements
    ApplicationService<
      LockListRequest,
      never[]
    >
{
  execute(): Promise<never[]> {
    return Promise.reject(
      new Error(
        "Lock application service unavailable: production HTTP ingress is not verified.",
      ),
    )
  }
}
