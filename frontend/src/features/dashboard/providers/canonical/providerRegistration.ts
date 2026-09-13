export interface DashboardProviderRegistration {
  key: "provider.dashboard.api";
  domain: "dashboard";
  initialized: boolean;
}

export const dashboardProviderRegistration: DashboardProviderRegistration = {
  key: "provider.dashboard.api",
  domain: "dashboard",
  initialized: true,
};
