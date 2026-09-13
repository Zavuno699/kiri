import { UnsupportedIngressError } from "../../../../application/api/errors/unsupportedIngressError"

export function assertSecurityIngress(): never {
  throw new UnsupportedIngressError("security")
}
