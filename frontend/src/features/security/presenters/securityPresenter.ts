import {
  buildSecurityViewModel,
} from "../models/securityViewModel"

export function presentSecurity(
  input: Parameters<
    typeof buildSecurityViewModel
  >[0],
) {
  return buildSecurityViewModel(input)
}
