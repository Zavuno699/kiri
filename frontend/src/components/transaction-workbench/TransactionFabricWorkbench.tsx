import {
  TransactionWorkbenchHeader,
} from "./header/TransactionWorkbenchHeader";

import {
  TransactionList,
} from "./transactions/TransactionList";

import {
  SagaPanel,
} from "./saga/SagaPanel";

import {
  RecoveryPanel,
} from "./recovery/RecoveryPanel";

import {
  IdempotencyPanel,
} from "./idempotency/IdempotencyPanel";

import {
  RetryPolicyPanel,
} from "./retry/RetryPolicyPanel";

import {
  TransactionStatus,
} from "./status/TransactionStatus";

interface Props {
  transactionId?: string;
}

export function TransactionFabricWorkbench({
  transactionId =
    "txn.lease-lock",
}: Props) {
  return (
    <section className="space-y-4">
      <TransactionWorkbenchHeader />

      <div className="grid gap-4 lg:grid-cols-2">
        <TransactionList />
        <SagaPanel />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <RecoveryPanel />
        <IdempotencyPanel />
      </div>

      <RetryPolicyPanel
        transactionId={
          transactionId
        }
      />

      <TransactionStatus />
    </section>
  );
}
