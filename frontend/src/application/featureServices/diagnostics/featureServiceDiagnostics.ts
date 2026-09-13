import {
  listFeatureServiceDescriptors,
} from "../registry/featureServiceRegistry";

export function getFeatureServiceDiagnostics() {
  const descriptors =
    listFeatureServiceDescriptors();

  const required =
    descriptors.filter(
      (descriptor) =>
        descriptor.required,
    );

  return {
    total:
      descriptors.length,
    required:
      required.length,
    initialized:
      required.filter(
        (descriptor) =>
          descriptor.initialized,
      ).length,
    missing:
      required
        .filter(
          (descriptor) =>
            !descriptor.initialized,
        )
        .map(
          (descriptor) =>
            descriptor.key,
        ),
  };
}
