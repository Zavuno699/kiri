import type {
  OperationalLease,
} from "../../../domain/contracts"
import { leaseSummary } from "../presentation/LeaseSummary"

export function createLeaseSurface(
  lease?: OperationalLease,
) {
  return lease
    ? leaseSummary(lease)
    : undefined
}
