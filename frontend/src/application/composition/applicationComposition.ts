import type { DomainModule } from "./domainModule"

export interface ApplicationComposition {
  modules: DomainModule[]
  initialized: boolean
}
