import type {
  FeatureRuntimeRegistration,
} from "../contracts/featureRuntimeRegistration";

export interface FeatureRuntimeState {
  initialized: boolean;
  features: FeatureRuntimeRegistration[];
}
