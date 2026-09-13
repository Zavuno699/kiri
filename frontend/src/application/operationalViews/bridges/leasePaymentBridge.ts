import {
  queryEntityGraph,
} from "../../dataFabric/runtime/queryEntityGraph";

export function resolveLeasePaymentBridge() {
  return queryEntityGraph(
    "lease",
    "payment",
  );
}
