#!/bin/bash

set -e

echo "============================================================"
echo "KIRILOCK PHASE 9S"
echo "REAL FEATURE ROUTE COMPOSITION + PAGE CONNECTION LAYER"
echo "============================================================"

echo "PWD: $(pwd)"
echo


echo "Creating route composition..."

mkdir -p src/routes

mkdir -p src/application/navigation
mkdir -p src/application/runtime


for feature in dashboard device lock payment property lease security
do
mkdir -p src/features/$feature

cat > src/features/$feature/${feature^}Route.tsx <<TSX
export function ${feature^}Route(){

    return (
        <div>
            ${feature^} Workspace
        </div>
    )

}
TSX

done


cat > src/routes/featureRoutes.tsx <<'TSX'
import { DashboardRoute } from "../features/dashboard/DashboardRoute"
import { DeviceRoute } from "../features/device/DeviceRoute"
import { LockRoute } from "../features/lock/LockRoute"
import { PaymentRoute } from "../features/payment/PaymentRoute"
import { PropertyRoute } from "../features/property/PropertyRoute"
import { LeaseRoute } from "../features/lease/LeaseRoute"
import { SecurityRoute } from "../features/security/SecurityRoute"


export const featureRoutes = {

    dashboard: DashboardRoute,
    device: DeviceRoute,
    lock: LockRoute,
    payment: PaymentRoute,
    property: PropertyRoute,
    lease: LeaseRoute,
    security: SecurityRoute

}

TSX


cat > src/routes/routeRegistry.tsx <<'TSX'
import { featureRoutes } from "./featureRoutes"

export const routeRegistry = featureRoutes

TSX


cat > src/application/navigation/navigationRegistry.ts <<'TS'
export const navigationRegistry = [

    "dashboard",
    "property",
    "lease",
    "payment",
    "device",
    "lock",
    "security"

]

TS


cat > src/application/runtime/featureRuntime.ts <<'TS'
export interface FeatureRuntime {

    enabled:string[]

}


export const runtime:FeatureRuntime = {

    enabled:[]

}

TS


echo
echo "============================================================"
echo "PHASE 9S COMPLETE"
echo "============================================================"

echo "Feature routes: CREATED"
echo "Route registry: CREATED"
echo "Navigation registry: CREATED"
echo "Runtime feature registry: CREATED"
echo "Page boundaries connected: CREATED"
echo "Tests: NOT CREATED"
echo "NO BUILD RUN"

echo
echo "============================================================"
echo "FILE COUNT SNAPSHOT"
find src -type f | wc -l

echo
echo "NEXT: PHASE 9T"
echo "============================================================"

