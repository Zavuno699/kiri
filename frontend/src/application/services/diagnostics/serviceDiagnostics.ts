import {
  listServices,
} from "../registry/serviceRegistry";

export function getServiceDiagnostics() {
  const services =
    listServices();

  const required =
    services.filter(
      (service) => service.required,
    );

  return {
    total:
      services.length,
    required:
      required.length,
    initialized:
      services.filter(
        (service) => service.initialized,
      ).length,
    missingRequired:
      required
        .filter(
          (service) => !service.initialized,
        )
        .map(
          (service) => service.key,
        ),
  };
}
