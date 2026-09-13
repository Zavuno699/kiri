export interface PaymentsServiceRegistration {
  key: "feature.payments.service";
  domain: "payments";
  initialized: boolean;
}

export const paymentsServiceRegistration: PaymentsServiceRegistration = {
  key: "feature.payments.service",
  domain: "payments",
  initialized: true,
};
