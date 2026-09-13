import {
  presentLease,
} from "../presenters/leasePresenter"

export function integrateLease(
  raw: Parameters<typeof presentLease>[0],
) {
  return presentLease(raw)
}
