import {
  paymentsResourceAdapter,
} from "../canonical/paymentsResourceAdapter";

export async function createPaymentsApi<
  TBody = unknown,
  TResult = unknown,
>(
  body: TBody,
) {
  return paymentsResourceAdapter.create<
    TBody,
    TResult
  >(body);
}
