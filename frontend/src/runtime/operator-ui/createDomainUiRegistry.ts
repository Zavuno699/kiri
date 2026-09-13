import {
  domainUiDefinitions,
} from "./domainUiDefinitions"

export function createDomainUiRegistry() {
  return new Map(
    domainUiDefinitions.map((item) => [
      item.domain,
      item,
    ]),
  )
}
