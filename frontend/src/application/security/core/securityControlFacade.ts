import {
  initializeSecurityRuntime,
} from "../runtime/initializeSecurityRuntime";

import {
  authorizeCapability,
} from "./securityAuthorizationService";

import {
  emergencyFreezeSecurity,
} from "./securityFreezeService";

import {
  recoverSecurityState,
} from "../runtime/recoverSecurityState";

import {
  getSecurityMode,
} from "../state/securityModeStore";

import {
  getSecurityFreezeState,
} from "../state/securityFreezeStore";

export const securityControlFacade = {
  initialize:
    initializeSecurityRuntime,

  authorize:
    authorizeCapability,

  freeze:
    emergencyFreezeSecurity,

  recover:
    recoverSecurityState,

  getMode:
    getSecurityMode,

  getFreezeState:
    getSecurityFreezeState,
};
