import {
  getPaymentsEntityFabric,
} from "../paymentsEntityFabric";

export function getPaymentsDataFabricDiagnostics() {
  return {
    domain:
      "payments",
    state:
      getPaymentsEntityFabric(),
  };
}
