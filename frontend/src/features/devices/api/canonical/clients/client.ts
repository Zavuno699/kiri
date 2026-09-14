import {
  createFeatureClient,
} from "../../../../../application/featureServices/runtime/createFeatureClient";

export const devicesApiClient =
  createFeatureClient("devices");
