import type { ReactNode } from "react"
import { OperatorActionBar } from "../../../../components/operator/actions/OperatorActionBar"

export function PaymentActions({
  children,
}: {
  children?: ReactNode
}) {
  return (
    <OperatorActionBar>
      {children}
    </OperatorActionBar>
  )
}
