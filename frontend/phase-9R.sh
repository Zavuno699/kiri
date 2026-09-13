#!/bin/bash

set -e

echo "============================================================"
echo "KIRILOCK PHASE 9R"
echo "FRONTEND SERVICE WIRING + CONTRACT ADAPTER LAYER"
echo "============================================================"

echo "PWD: $(pwd)"
echo

mkdir -p src/platform/http

mkdir -p src/application/services
mkdir -p src/application/adapters


mkdir -p src/features/dashboard/controllers
mkdir -p src/features/device/controllers
mkdir -p src/features/device/presenters

mkdir -p src/features/lock/controllers
mkdir -p src/features/lock/presenters

mkdir -p src/features/payment/controllers
mkdir -p src/features/lease/controllers
mkdir -p src/features/security/controllers
mkdir -p src/features/security/presenters


echo "Creating HTTP boundary..."

cat > src/platform/http/httpClient.ts <<'TS'
export interface HTTPClient {
    get<T>(url:string):Promise<T>
    post<T>(url:string,data:unknown):Promise<T>
}
TS


cat > src/platform/http/httpResponse.ts <<'TS'
export interface HTTPResponse<T> {
    data:T
    status:number
}
TS


cat > src/platform/http/httpError.ts <<'TS'
export class HTTPError extends Error {
    status:number

    constructor(status:number,message:string){
        super(message)
        this.status=status
    }
}
TS


echo "Creating application services..."

for service in device lock payment lease security
do

cat > src/application/services/${service}Service.ts <<TS
export interface ${service^}Service {
    list(): Promise<unknown[]>
    get(id:string): Promise<unknown>
}

TS

done


echo "Creating adapters..."

for adapter in device lock payment lease security
do

cat > src/application/adapters/${adapter}Adapter.ts <<TS
import type { ${adapter^}Service } from "../services/${adapter}Service"

export class ${adapter^}Adapter {

    constructor(
        private service:${adapter^}Service
    ){}

}

TS

done


echo "Creating feature controllers..."

for feature in dashboard device lock payment lease security
do

cat > src/features/$feature/controllers/${feature}Controller.ts <<TS
export class ${feature^}Controller {

    async load(){
        return []
    }

}

TS

done


echo "Creating presenters..."

for feature in device lock security
do

cat > src/features/$feature/presenters/${feature}Presenter.ts <<TS
export function ${feature}Presenter(
    value:unknown
){
    return value
}

TS

done


echo
echo "============================================================"
echo "PHASE 9R COMPLETE"
echo "============================================================"

echo "HTTP boundary: CREATED"
echo "Application services: CREATED"
echo "Backend adapters: CREATED"
echo "Feature controllers: CREATED"
echo "Presentation adapters: CREATED"
echo "Contract wiring seams: CREATED"
echo "Tests: NOT CREATED"
echo "NO BUILD RUN"

echo
echo "============================================================"
echo "FILE COUNT SNAPSHOT"
find src -type f | wc -l

echo
echo "NEXT: PHASE 9S"
echo "============================================================"

