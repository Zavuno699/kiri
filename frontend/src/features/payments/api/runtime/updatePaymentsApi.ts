import {
  paymentsResourceAdapter,
} from "../canonical/paymentsResourceAdapter";

export async function updatePaymentsApi<
  TBody = unknown,
  TResult = unknown,
>(
  id: string,
  body: TBody,
) {
  return paymentsResourceAdapter.update<
    TBody,
    TResult
  >(
    id,
    body,
  );
}
