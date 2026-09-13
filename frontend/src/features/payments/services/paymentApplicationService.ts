import type {
  ApplicationService,
} from "../../../application/services/service"
import type {
  PaymentRecord,
} from "../types/payment"

export interface PaymentListRequest {
  search?: string
  status?: string
  reconciliationStatus?: string
}

export class PaymentListService
  implements
    ApplicationService<
      PaymentListRequest,
      PaymentRecord[]
    >
{
  constructor(
    private readonly load: () => Promise<
      PaymentRecord[]
    >,
  ) {}

  execute(): Promise<PaymentRecord[]> {
    return this.load()
  }
}
