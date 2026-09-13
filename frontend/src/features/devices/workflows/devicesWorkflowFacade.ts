export function createDevicesWorkflowFacade() {
  return {
    domain: "devices",

    getResourceKey(): string {
      return "devices";
    },
  };
}
