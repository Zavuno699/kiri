export const SecurityCacheKeys = {
  collection:
    "security:security",

  detail(
    id: string,
  ): string {
    return "security:" + id;
  },
};
