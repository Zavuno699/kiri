import {
  createFeatureClient,
} from "../../../../../application/featureServices/runtime/createFeatureClient";

export const securityApiClient =
  createFeatureClient("security");
