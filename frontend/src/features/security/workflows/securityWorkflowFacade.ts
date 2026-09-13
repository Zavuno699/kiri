export function createSecurityWorkflowFacade() {
  return {
    domain: "security",

    getResourceKey(): string {
      return "security";
    },
  };
}
