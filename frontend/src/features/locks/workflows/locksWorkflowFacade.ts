export function createLocksWorkflowFacade() {
  return {
    domain: "locks",

    getResourceKey(): string {
      return "locks";
    },
  };
}
