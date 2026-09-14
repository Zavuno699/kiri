import {
  createFeatureClient,
} from "../../../../../application/featureServices/runtime/createFeatureClient";

export const paymentsApiClient =
  createFeatureClient("payments");
