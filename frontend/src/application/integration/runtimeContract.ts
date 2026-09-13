export interface RuntimeContract {
  environment: string
  apiBaseUrl: string
  authenticated: boolean
  productionSafe: boolean
}

export function evaluateRuntimeContract(
  input: RuntimeContract,
): RuntimeContract {
  return {
    ...input,
    productionSafe:
      input.productionSafe &&
      input.environment.length > 0 &&
      input.apiBaseUrl.length > 0,
  }
}
