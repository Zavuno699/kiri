import { createBrowserRouter } from "react-router";

import { AppShell } from "../components/layout/AppShell";
import { RouteErrorBoundary } from "../components/runtime/RouteErrorBoundary";
import { ProtectedRoute } from "../components/runtime/ProtectedRoute";

import { DashboardPage } from "../pages/DashboardPage";
import { PropertiesPage } from "../features/properties/PropertiesPage";
import { LeasesPage } from "../features/leases/LeasesPage";
import { PaymentsPage } from "../features/payments/PaymentsPage";
import { DevicesPage } from "../features/devices/DevicesPage";
import { LocksPage } from "../features/locks/LocksPage";
import { SecurityPage } from "../features/security/SecurityPage";
import { SignInPage } from "../pages/auth/SignInPage";
import { UnauthorizedPage } from "../pages/UnauthorizedPage";

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
    path: "/signin",
    element: <SignInPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppShell />
      </ProtectedRoute>
    ),
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
        element: (
          <ProtectedRoute requiredRoles={["security_admin", "super_admin"]}>
            <SecurityPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "security/audit",
        element: (
          <ProtectedRoute requiredRoles={["security_admin", "super_admin"]}>
            <SecurityAuditPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "security/control",
        element: (
          <ProtectedRoute requiredRoles={["security_admin", "super_admin"]}>
            <SecurityControlPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "rbac",
        element: (
          <ProtectedRoute requiredRoles={["security_admin", "super_admin"]}>
            <RBACControlPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "operator-control",
        element: (
          <ProtectedRoute requiredRoles={["operator", "security_admin", "super_admin"]}>
            <OperatorControlPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "operator-control/global",
        element: (
          <ProtectedRoute requiredRoles={["super_admin"]}>
            <GlobalOperatorControlPage />
          </ProtectedRoute>
        ),
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
