export const LocksCacheKeys = {
  collection:
    "locks:locks",

  detail(
    id: string,
  ): string {
    return "locks:" + id;
  },
};
