export const PropertiesCacheKeys = {
  collection:
    "properties:properties",

  detail(
    id: string,
  ): string {
    return "properties:" + id;
  },
};
