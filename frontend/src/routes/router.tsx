import { createBrowserRouter } from "react-router";

import { AppShell } from "../components/layout/AppShell";
import { RouteErrorBoundary } from "../components/runtime/RouteErrorBoundary";

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
import { NotFoundPage } from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "properties",
        element: <PropertiesPage />,
      },
      {
        path: "leases",
        element: <LeasesPage />,
      },
      {
        path: "payments",
        element: <PaymentsPage />,
      },
      {
        path: "devices",
        element: <DevicesPage />,
      },
      {
        path: "locks",
        element: <LocksPage />,
      },
      {
        path: "security",
        element: <SecurityPage />,
      },
      {
        path: "security/audit",
        element: <SecurityAuditPage />,
      },
      {
        path: "security/control",
        element: <SecurityControlPage />,
      },
      {
        path: "rbac",
        element: <RBACControlPage />,
      },
      {
        path: "operator-control",
        element: <OperatorControlPage />,
      },
      {
        path: "operator-control/global",
        element: <GlobalOperatorControlPage />,
      },
      {
        path: "health",
        element: <FrontendHealthPage />,
      },
      {
        path: "integrity",
        element: <OperationalIntegrityPage />,
      },
      {
        path: "runtime",
        element: <UnifiedRuntimePage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
