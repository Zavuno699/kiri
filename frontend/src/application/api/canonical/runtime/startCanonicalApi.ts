import {
  startApiRuntime,
} from "./startApiRuntime";

import {
  registerFeatureServiceDescriptors,
} from "../../../featureServices/runtime/registerFeatureServiceDescriptors";

export function startCanonicalApiLayer(): void {
  startApiRuntime();
  registerFeatureServiceDescriptors();
}
