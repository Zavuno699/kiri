import {
  getDashboardPageConvergence,
} from "../../../features/dashboard/ui/diagnostics/dashboardPageConvergence";

import {
  getPropertiesPageConvergence,
} from "../../../features/properties/ui/diagnostics/propertiesPageConvergence";

import {
  getLeasesPageConvergence,
} from "../../../features/leases/ui/diagnostics/leasesPageConvergence";

import {
  getPaymentsPageConvergence,
} from "../../../features/payments/ui/diagnostics/paymentsPageConvergence";

import {
  getDevicesPageConvergence,
} from "../../../features/devices/ui/diagnostics/devicesPageConvergence";

import {
  getLocksPageConvergence,
} from "../../../features/locks/ui/diagnostics/locksPageConvergence";

import {
  getSecurityPageConvergence,
} from "../../../features/security/ui/diagnostics/securityPageConvergence";

export function getPageConvergenceDiagnostics() {
  return [
    getDashboardPageConvergence(),
    getPropertiesPageConvergence(),
    getLeasesPageConvergence(),
    getPaymentsPageConvergence(),
    getDevicesPageConvergence(),
    getLocksPageConvergence(),
    getSecurityPageConvergence(),
  ];
}
