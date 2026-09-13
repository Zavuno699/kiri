import {
  buildLeaseViewModel,
} from "../models/leaseViewModel"

export function presentLease(
  lease: Parameters<
    typeof buildLeaseViewModel
  >[0],
) {
  return buildLeaseViewModel(lease)
}
