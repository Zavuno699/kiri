import {
  createResourceAdapter,
} from "../../../../application/api/resources/resourceAdapterFactory";

export const paymentsResourceAdapter =
  createResourceAdapter(
    "payments",
  );
