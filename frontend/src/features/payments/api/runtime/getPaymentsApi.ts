import {
  paymentsResourceAdapter,
} from "../canonical/paymentsResourceAdapter";

export async function getPaymentsApi<T = unknown>(
  id: string,
) {
  return paymentsResourceAdapter.get<T>(
    id,
  );
}
