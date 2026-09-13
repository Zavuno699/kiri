import {
  presentSecurity,
} from "../presenters/securityPresenter"

export function integrateSecurity(
  raw: Parameters<typeof presentSecurity>[0],
) {
  return presentSecurity(raw)
}
