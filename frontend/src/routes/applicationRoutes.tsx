import type { ReactElement } from "react";

import { DashboardPage } from "../pages/DashboardPage";
import { PropertiesPage } from "../features/properties/PropertiesPage";
import { LeasesPage } from "../features/leases/LeasesPage";
import { PaymentsPage } from "../features/payments/PaymentsPage";
import { DevicesPage } from "../features/devices/DevicesPage";
import { LocksPage } from "../features/locks/LocksPage";
import { SecurityPage } from "../features/security/SecurityPage";

import { SecurityAuditPage } from "../pages/security/SecurityAuditPage";
import { SecurityControlPage } from "../pages/security/SecurityControlPage";
import { RBACControlPage } from "../pages/rbac/RBACControlPage";
import { OperatorControlPage } from "../pages/operator/OperatorControlPage";
import { GlobalOperatorControlPage } from "../pages/operatorControl/GlobalOperatorControlPage";
import { FrontendHealthPage } from "../pages/health/FrontendHealthPage";
import { OperationalIntegrityPage } from "../pages/integrity/OperationalIntegrityPage";
import { UnifiedRuntimePage } from "../pages/runtime/UnifiedRuntimePage";

export interface ApplicationRoute {
  id: string;
  path: string;
  element: ReactElement;
  label: string;
}

export const applicationRoutes: ApplicationRoute[] = [
  {
    id: "dashboard",
    path: "/",
    element: <DashboardPage />,
    label: "Overview",
  },
  {
    id: "properties",
    path: "/properties",
    element: <PropertiesPage />,
    label: "Properties",
  },
  {
    id: "leases",
    path: "/leases",
    element: <LeasesPage />,
    label: "Leases",
  },
  {
    id: "payments",
    path: "/payments",
    element: <PaymentsPage />,
    label: "Payments",
  },
  {
    id: "devices",
    path: "/devices",
    element: <DevicesPage />,
    label: "Devices",
  },
  {
    id: "locks",
    path: "/locks",
    element: <LocksPage />,
    label: "Locks",
  },
  {
    id: "security",
    path: "/security",
    element: <SecurityPage />,
    label: "Security",
  },
  {
    id: "security-audit",
    path: "/security/audit",
    element: <SecurityAuditPage />,
    label: "Security Audit",
  },
  {
    id: "security-control",
    path: "/security/control",
    element: <SecurityControlPage />,
    label: "Security Control",
  },
  {
    id: "rbac",
    path: "/rbac",
    element: <RBACControlPage />,
    label: "Access Control",
  },
  {
    id: "operator-control",
    path: "/operator-control",
    element: <OperatorControlPage />,
    label: "Operator Control",
  },
  {
    id: "operator-global",
    path: "/operator-control/global",
    element: <GlobalOperatorControlPage />,
    label: "Global Operator Control",
  },
  {
    id: "health",
    path: "/health",
    element: <FrontendHealthPage />,
    label: "Frontend Health",
  },
  {
    id: "integrity",
    path: "/integrity",
    element: <OperationalIntegrityPage />,
    label: "Operational Integrity",
  },
  {
    id: "runtime",
    path: "/runtime",
    element: <UnifiedRuntimePage />,
    label: "Unified Runtime",
  },
];
