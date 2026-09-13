export const DevicesCacheKeys = {
  collection:
    "devices:devices",

  detail(
    id: string,
  ): string {
    return "devices:" + id;
  },
};
