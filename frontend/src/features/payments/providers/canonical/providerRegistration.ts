export interface PaymentsProviderRegistration {
  key: "provider.payments.api";
  domain: "payments";
  initialized: boolean;
}

export const paymentsProviderRegistration: PaymentsProviderRegistration = {
  key: "provider.payments.api",
  domain: "payments",
  initialized: true,
};
