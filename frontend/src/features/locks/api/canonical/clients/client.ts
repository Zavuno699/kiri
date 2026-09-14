import {
  createFeatureClient,
} from "../../../../../application/featureServices/runtime/createFeatureClient";

export const locksApiClient =
  createFeatureClient("locks");
