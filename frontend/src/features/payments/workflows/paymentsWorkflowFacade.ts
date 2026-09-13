export function createPaymentsWorkflowFacade() {
  return {
    domain: "payments",

    getResourceKey(): string {
      return "payments";
    },
  };
}
