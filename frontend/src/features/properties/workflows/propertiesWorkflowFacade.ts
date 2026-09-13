export function createPropertiesWorkflowFacade() {
  return {
    domain: "properties",

    getResourceKey(): string {
      return "properties";
    },
  };
}
