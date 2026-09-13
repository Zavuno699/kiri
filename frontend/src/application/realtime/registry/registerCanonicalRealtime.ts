import {
  initializeDashboardRealtime,
} from "../../../features/dashboard/realtime/dashboardRealtimeFacade";

import {
  initializePropertiesRealtime,
} from "../../../features/properties/realtime/propertiesRealtimeFacade";

import {
  initializeLeasesRealtime,
} from "../../../features/leases/realtime/leasesRealtimeFacade";

import {
  initializePaymentsRealtime,
} from "../../../features/payments/realtime/paymentsRealtimeFacade";

import {
  initializeDevicesRealtime,
} from "../../../features/devices/realtime/devicesRealtimeFacade";

import {
  initializeLocksRealtime,
} from "../../../features/locks/realtime/locksRealtimeFacade";

import {
  initializeSecurityRealtime,
} from "../../../features/security/realtime/securityRealtimeFacade";

export function registerCanonicalRealtime(): void {
  initializeDashboardRealtime();
  initializePropertiesRealtime();
  initializeLeasesRealtime();
  initializePaymentsRealtime();
  initializeDevicesRealtime();
  initializeLocksRealtime();
  initializeSecurityRealtime();
}
