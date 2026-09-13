import {
  paymentsResourceAdapter,
} from "../canonical/paymentsResourceAdapter";

export async function listPaymentsApi<T = unknown>() {
  return paymentsResourceAdapter.list<T>();
}
