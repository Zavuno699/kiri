#!/bin/bash
set -Eeuo pipefail

ROOT="/home/Rat/kirilock/frontend"
cd "$ROOT"

echo "============================================================"
echo "KIRILOCK PHASE 10A.1"
echo "BUILD ERROR REPAIR"
echo "============================================================"
echo "PWD: $PWD"
echo

STAMP="$(date +%Y%m%d_%H%M%S)"
BACKUP=".phase-10A.1-backup-$STAMP"
LOG=".phase-10A.1-build-$STAMP.log"

mkdir -p "$BACKUP"

FILES=(
  src/application/adapters/deviceAdapter.ts
  src/application/adapters/leaseAdapter.ts
  src/application/adapters/lockAdapter.ts
  src/application/adapters/paymentAdapter.ts
  src/application/adapters/securityAdapter.ts
  src/application/bus/queryBus.ts
  src/application/locks/lockCoordinator.ts
  src/application/viewmodels/leaseViewModel.ts
  src/application/viewmodels/propertyViewModel.ts
  src/features/dashboard/components/DashboardMetricGrid.tsx
  src/features/devices/services/deviceApplicationService.ts
  src/features/leases/LeasesPage.tsx
  src/features/leases/projections/leaseProjection.ts
  src/features/leases/selectors/leaseSelectors.ts
  src/features/leases/services/leaseService.ts
  src/features/payments/components/PaymentMetricStrip.tsx
  src/features/payments/services/paymentApplicationService.ts
  src/features/properties/PropertiesPage.tsx
  src/features/properties/projections/propertyProjection.ts
  src/features/properties/selectors/propertySelectors.ts
  src/features/properties/services/propertyService.ts
  src/features/security/controllers/index.ts
  src/features/security/controllers/securityController.ts
  src/features/security/projections/securityProjection.ts
  src/infrastructure/providers/unavailableProvider.ts
  src/lib/adapters/leaseAdapter.ts
  src/lib/adapters/propertyAdapter.ts
)

for f in "${FILES[@]}"; do
  [[ -f "$f" ]] || continue
  mkdir -p "$BACKUP/$(dirname "$f")"
  cp "$f" "$BACKUP/$f"
done

echo "Backed up affected files to:"
echo "  $BACKUP"
echo

echo "============================================================"
echo "ERROR SURFACE INSPECTION"
echo "============================================================"

echo
echo "--- LeaseRecord definition ---"
grep -Rns --include='*.ts' --include='*.tsx' \
  "interface LeaseRecord\|type LeaseRecord" src || true

echo
echo "--- PropertyRecord definition ---"
grep -Rns --include='*.ts' --include='*.tsx' \
  "interface PropertyRecord\|type PropertyRecord" src || true

echo
echo "--- LeaseStatus definition ---"
grep -Rns --include='*.ts' --include='*.tsx' \
  "enum LeaseStatus\|type LeaseStatus\|LeaseStatus =" src || true

echo
echo "--- SecurityMetrics definition ---"
grep -Rns --include='*.ts' --include='*.tsx' \
  "interface SecurityMetrics\|type SecurityMetrics" src || true

echo
echo "--- Metric color type ---"
grep -Rns --include='*.ts' --include='*.tsx' \
  '"purple"\|"blue" | "green" | "amber" | "red"' src/components src/features src/types src || true

echo
echo "--- Service parameter properties ---"
grep -Rns --include='*.ts' --include='*.tsx' \
  "constructor(private readonly\|constructor(private " src/application src/features src/infrastructure || true

echo
echo "============================================================"
echo "DETERMINISTIC FIXES"
echo "============================================================"

python3 <<'PY'
from pathlib import Path
import re

root = Path("/home/Rat/kirilock/frontend")

# ------------------------------------------------------------
# 1. Convert one-line TypeScript parameter-property
#    constructors into erasable-safe class fields.
# ------------------------------------------------------------

parameter_property_files = [
    "src/application/adapters/deviceAdapter.ts",
    "src/application/adapters/leaseAdapter.ts",
    "src/application/adapters/lockAdapter.ts",
    "src/application/adapters/paymentAdapter.ts",
    "src/application/adapters/securityAdapter.ts",
    "src/features/devices/services/deviceApplicationService.ts",
    "src/features/leases/services/leaseService.ts",
    "src/features/payments/services/paymentApplicationService.ts",
    "src/features/properties/services/propertyService.ts",
    "src/infrastructure/providers/unavailableProvider.ts",
]

for rel in parameter_property_files:
    p = root / rel
    if not p.exists():
        continue

    s = p.read_text()

    # Handles common generated form:
    # constructor(private readonly service: SomeType) {}
    pat = re.compile(
        r"constructor\s*\(\s*private\s+readonly\s+([A-Za-z_$][\w$]*)\s*:\s*([^)\n]+)\s*\)\s*\{\s*\}",
        re.MULTILINE,
    )

    def repl(m):
        name = m.group(1)
        typ = m.group(2).strip()
        return (
            f"readonly {name}: {typ}\n\n"
            f"constructor({name}: {typ}) {{\n"
            f"  this.{name} = {name}\n"
            f"}}"
        )

    s2 = pat.sub(repl, s)
    p.write_text(s2)

# ------------------------------------------------------------
# 2. Remove unused generic parameter from query bus.
# ------------------------------------------------------------

p = root / "src/application/bus/queryBus.ts"
if p.exists():
    s = p.read_text()
    s = s.replace("<TResponse>", "")
    s = s.replace(", TResponse", "")
    s = s.replace("TResponse, ", "")
    p.write_text(s)

# ------------------------------------------------------------
# 3. Remove illegal readonly modifier from object/member
#    declarations in lockCoordinator when emitted as runtime code.
# ------------------------------------------------------------

p = root / "src/application/locks/lockCoordinator.ts"
if p.exists():
    s = p.read_text()
    s = re.sub(r"\breadonly\s+(?=[A-Za-z_$][\w$]*\s*:)", "", s)
    p.write_text(s)

# ------------------------------------------------------------
# 4. Purple is a valid KiriLock status color elsewhere,
#    but these two components currently accept only four/five
#    legacy metric colors. Normalize purple to blue so the
#    component contract remains unchanged.
# ------------------------------------------------------------

for rel in [
    "src/features/dashboard/components/DashboardMetricGrid.tsx",
    "src/features/payments/components/PaymentMetricStrip.tsx",
]:
    p = root / rel
    if p.exists():
        s = p.read_text()
        s = s.replace('color="purple"', 'color="blue"')
        s = s.replace("color: 'purple'", "color: 'blue'")
        s = s.replace('color: "purple"', 'color: "blue"')
        p.write_text(s)
PY

# ------------------------------------------------------------
# 5. Show actual service exports before changing pages.
# ------------------------------------------------------------

echo
echo "--- Lease service exports ---"
grep -nE 'export (async )?(function|const)|export \{' \
  src/features/leases/services/leaseService.ts || true

echo
echo "--- Property service exports ---"
grep -nE 'export (async )?(function|const)|export \{' \
  src/features/properties/services/propertyService.ts || true

echo
echo "--- Security controller exports ---"
grep -nE 'export (async )?(function|const)|export \{' \
  src/features/security/controllers/securityController.ts || true

# ------------------------------------------------------------
# 6. Build immediately after safe syntax repairs.
#    Remaining semantic errors are deliberately left visible
#    rather than guessed around.
# ------------------------------------------------------------

echo
echo "============================================================"
echo "BUILD CHECKPOINT"
echo "============================================================"

set +e
npm run build 2>&1 | tee "$LOG"
STATUS=${PIPESTATUS[0]}
set -e

echo
echo "============================================================"

if [[ "$STATUS" -eq 0 ]]; then
  echo "PHASE 10A.1 COMPLETE"
  echo "Build: PASS"
  echo "Backup: $BACKUP"
  echo "Log: $LOG"
  echo "Source files: $(find src -type f | wc -l)"
  echo "============================================================"
  echo
  echo "NEXT: PHASE 10B"
  exit 0
fi

echo "PHASE 10A.1 PARTIAL"
echo "Build still fails."
echo "Exit code: $STATUS"
echo "Backup: $BACKUP"
echo "Log: $LOG"
echo "============================================================"
echo
echo "NEXT: PHASE 10A.2"
echo "10A.2 will address the remaining semantic contract mismatches"
echo "from this exact compiler output."
exit "$STATUS"
