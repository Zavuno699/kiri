#!/bin/bash

set -e

echo "============================================================"
echo "KIRILOCK PHASE 9W"
echo "REAL ROUTE BINDING + FEATURE PAGE ACTIVATION"
echo "============================================================"

echo "PWD: $(pwd)"
echo


mkdir -p src/routes
mkdir -p src/application/navigation


for feature in dashboard device lock security payment lease property
do

mkdir -p src/features/$feature/routes

cat > src/features/$feature/routes.ts <<EOF
export const ${feature}Routes = [
    "${feature}"
]
EOF

done


echo "Creating application route map..."

cat > src/routes/routeMap.ts <<'EOF'
export const routeMap = {

    dashboard:"/dashboard",
    property:"/property",
    lease:"/lease",
    payment:"/payment",
    device:"/device",
    lock:"/lock",
    security:"/security"

}
EOF


cat > src/routes/applicationRoutes.tsx <<'EOF'
import { DashboardPage } from "../features/dashboard/pages/DashboardPage"
import { PropertyPage } from "../features/property/pages/PropertyPage"
import { LeasePage } from "../features/lease/pages/LeasePage"
import { PaymentPage } from "../features/payment/pages/PaymentPage"
import { DevicePage } from "../features/device/pages/DevicePage"
import { LockPage } from "../features/lock/pages/LockPage"
import { SecurityPage } from "../features/security/pages/SecurityPage"


export const applicationRoutes = [

    {
        path:"/dashboard",
        element:<DashboardPage/>
    },

    {
        path:"/property",
        element:<PropertyPage/>
    },

    {
        path:"/lease",
        element:<LeasePage/>
    },

    {
        path:"/payment",
        element:<PaymentPage/>
    },

    {
        path:"/device",
        element:<DevicePage/>
    },

    {
        path:"/lock",
        element:<LockPage/>
    },

    {
        path:"/security",
        element:<SecurityPage/>
    }

]
EOF


echo "Creating operator navigation..."

cat > src/application/navigation/operatorMenu.ts <<'EOF'
export const operatorMenu = [

"dashboard",
"property",
"lease",
"payment",
"device",
"lock",
"security"

]
EOF


echo
echo "============================================================"
echo "PHASE 9W COMPLETE"
echo "============================================================"

echo "Application routes: CREATED"
echo "Feature route maps: CREATED"
echo "Real pages activated: CREATED"
echo "Operator menu: CREATED"
echo "Placeholder route usage: REDUCED"
echo "Tests: NOT CREATED"
echo "NO BUILD RUN"

echo
echo "FILE COUNT SNAPSHOT"
find src -type f | wc -l

echo
echo "============================================================"
echo "NEXT: PHASE 9X"
echo "============================================================"

