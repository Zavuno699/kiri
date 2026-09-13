import {
  queryEntityGraph,
} from "../runtime/queryEntityGraph";

export function selectLeasePayment() {
  return queryEntityGraph(
    "lease",
    "payment",
  );
}
