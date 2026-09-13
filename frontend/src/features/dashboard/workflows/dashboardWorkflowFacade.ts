export function createDashboardWorkflowFacade() {
  return {
    domain: "dashboard",

    getResourceKey(): string {
      return "dashboard";
    },
  };
}
