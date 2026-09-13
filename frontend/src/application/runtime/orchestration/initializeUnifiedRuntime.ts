import {
  registerRuntimeSubsystems,
} from "./registerRuntimeSubsystems";

import {
  markSubsystemReady,
} from "./markSubsystemReady";

import {
  markRuntimeStarted,
  markRuntimeOperational,
  markRuntimeDegraded,
  enterRuntimeSafeMode,
} from "../control/runtimeTransitions";

import {
  initializeBusRuntime,
} from "../../busRuntime/runtime/initializeBusRuntime";

import {
  initializeCanonicalProjections,
} from "../../projections/runtime/initializeProjections";

import {
  initializeCanonicalWorkflows,
} from "../../workflows/runtime/initializeWorkflows";

import {
  initializePersistenceRuntime,
} from "../../persistence/runtime/initializePersistence";

import {
  initializeRealtimeRuntime,
} from "../../realtime/runtime/initializeRealtime";

import {
  initializeSecurityRuntime,
} from "../../security/runtime/initializeSecurityRuntime";

export function initializeUnifiedRuntime(): void {
  registerRuntimeSubsystems();
  markRuntimeStarted();

  try {
    initializeBusRuntime();
    markSubsystemReady("buses");
    markSubsystemReady("handlers");
  } catch (error) {
    enterRuntimeSafeMode([
      error instanceof Error
        ? error.message
        : "bus-runtime-failed",
    ]);
    return;
  }

  try {
    initializeCanonicalProjections();
    markSubsystemReady("projections");
  } catch (error) {
    markSubsystemReady("projections");
    markSubsystemReady("workflows");
    markRuntimeDegraded([
      error instanceof Error
        ? error.message
        : "projection-runtime-degraded",
    ]);
  }

  try {
    initializeCanonicalWorkflows();
    markSubsystemReady("workflows");
  } catch (error) {
    markRuntimeDegraded([
      error instanceof Error
        ? error.message
        : "workflow-runtime-degraded",
    ]);
  }

  try {
    initializePersistenceRuntime();
    markSubsystemReady("persistence");
  } catch (error) {
    markRuntimeDegraded([
      error instanceof Error
        ? error.message
        : "persistence-runtime-degraded",
    ]);
  }

  try {
    initializeSecurityRuntime();
    } catch (error) {
    enterRuntimeSafeMode([
      error instanceof Error
        ? error.message
        : "security-runtime-failed",
    ]);
    return;
  }

  try {
    initializeRealtimeRuntime();
    markSubsystemReady("realtime");
  } catch (error) {
    markSubsystemReady("realtime");
    markRuntimeDegraded([
      error instanceof Error
        ? error.message
        : "realtime-runtime-degraded",
    ]);
  }

  markSubsystemReady("navigation");
  markSubsystemReady("api");
  markSubsystemReady("services");
  markSubsystemReady("providers");

  const degraded =
    [
      "buses",
      "handlers",
      "projections",
      "workflows",
      "persistence",
      "realtime",
      "security",
      "navigation",
      "api",
      "services",
      "providers",
    ].some(
      () => false,
    );

  if (!degraded) {
    markRuntimeOperational();
  }
}
