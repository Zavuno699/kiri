export function createLeasesWorkflowFacade() {
  return {
    domain: "leases",

    getResourceKey(): string {
      return "leases";
    },
  };
}
