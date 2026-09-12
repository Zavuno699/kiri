#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
DEPLOY="${ROOT}/device-service/deploy"

echo "== kubectl client =="
kubectl version --client

echo
echo "== Kustomize render =="
kubectl kustomize "${DEPLOY}" >/tmp/kiri-device-service-rendered.yaml
test -s /tmp/kiri-device-service-rendered.yaml

echo
echo "== Offline YAML validation =="

python3 - <<'PY'
from pathlib import Path
import yaml

path = Path("/tmp/kiri-device-service-rendered.yaml")
documents = list(yaml.safe_load_all(path.read_text()))

required = {
    "Deployment",
    "Service",
    "ServiceAccount",
    "ConfigMap",
    "PodDisruptionBudget",
    "HorizontalPodAutoscaler",
    "NetworkPolicy",
}

seen = set()

for index, doc in enumerate(documents, 1):
    if doc is None:
        continue

    if not isinstance(doc, dict):
        raise SystemExit(
            f"document {index}: expected YAML mapping"
        )

    for field in ("apiVersion", "kind", "metadata"):
        if field not in doc:
            raise SystemExit(
                f"document {index}: missing {field}"
            )

    if not doc["metadata"].get("name"):
        raise SystemExit(
            f"document {index}: missing metadata.name"
        )

    seen.add(doc["kind"])

missing = sorted(required - seen)

if missing:
    raise SystemExit(
        "missing expected resource kinds: "
        + ", ".join(missing)
    )

print(
    f"Offline Kubernetes manifest validation: OK "
    f"({len(documents)} documents)"
)
PY

echo
echo "== Kubernetes API detection =="

if kubectl cluster-info >/tmp/kiri-device-service-cluster-info.txt 2>&1; then
    cat /tmp/kiri-device-service-cluster-info.txt

    echo
    echo "== Server-side validation =="

    kubectl apply \
        --dry-run=server \
        -k "${DEPLOY}" \
        >/tmp/kiri-device-service-server-dry-run.yaml

    test -s /tmp/kiri-device-service-server-dry-run.yaml

    echo "Server-side validation: OK"
else
    echo "No reachable Kubernetes API."
    echo "Server-side validation skipped."
fi

echo
echo "device-service Kubernetes manifest validation: OK"
