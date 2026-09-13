import {
  createFeatureClient,
} from "../../../../application/featureServices/runtime/createFeatureClient";

export const leasesApiClient =
  createFeatureClient("leases");
