export interface VersionContract {
  version: number
}

export interface OptimisticConcurrencyContract
  extends VersionContract {
  expectedVersion?: number
}
