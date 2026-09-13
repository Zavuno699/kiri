export interface PaymentPageQueryBridge {
  execute(
    type: string,
    params?: unknown,
  ): Promise<unknown>
}
