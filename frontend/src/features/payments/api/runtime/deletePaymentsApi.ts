import {
  paymentsResourceAdapter,
} from "../canonical/paymentsResourceAdapter";

export async function deletePaymentsApi<
  TResult = unknown,
>(
  id: string,
) {
  return paymentsResourceAdapter.remove<TResult>(
    id,
  );
}
