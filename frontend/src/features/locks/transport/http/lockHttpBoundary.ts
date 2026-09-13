import { UnsupportedIngressError } from "../../../../application/api/errors/unsupportedIngressError"

export function assertLockIngress(): never {
  throw new UnsupportedIngressError("lock")
}
