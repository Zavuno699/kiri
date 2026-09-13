import {
  createFeatureClient,
} from "../../../../application/featureServices/runtime/createFeatureClient";

export const dashboardApiClient =
  createFeatureClient("dashboard");
