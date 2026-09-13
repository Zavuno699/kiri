import {
  leasePaymentPolicy,
} from "./leasePaymentPolicy";

import {
  leaseDevicePolicy,
} from "./leaseDevicePolicy";

import {
  leaseLockPolicy,
} from "./leaseLockPolicy";

import {
  securityDevicePolicy,
} from "./securityDevicePolicy";

import {
  securityLockPolicy,
} from "./securityLockPolicy";

import {
  securityRecoveryPolicy,
} from "./securityRecoveryPolicy";

export const CROSS_DOMAIN_POLICIES = [
  leasePaymentPolicy,
  leaseDevicePolicy,
  leaseLockPolicy,
  securityDevicePolicy,
  securityLockPolicy,
  securityRecoveryPolicy,
];
