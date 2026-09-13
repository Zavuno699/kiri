export const DashboardCacheKeys = {
  collection:
    "dashboard:dashboard",

  detail(
    id: string,
  ): string {
    return "dashboard:" + id;
  },
};
