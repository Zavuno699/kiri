export interface DashboardServiceRegistration {
  key: "feature.dashboard.service";
  domain: "dashboard";
  initialized: boolean;
}

export const dashboardServiceRegistration: DashboardServiceRegistration = {
  key: "feature.dashboard.service",
  domain: "dashboard",
  initialized: true,
};
