import {
  createFeatureClient,
} from "../../../../../application/featureServices/runtime/createFeatureClient";

export const propertiesApiClient =
  createFeatureClient("properties");
