import {
  registerCoreProviders,
} from "../providers/runtime/registerCoreProviders";

import {
  registerFeatureProviders,
} from "../providers/runtime/registerFeatureProviders";

import {
  initializeCoreProviders,
} from "../providers/runtime/initializeCoreProviders";

import {
  initializeFeatureProviders,
} from "../providers/runtime/initializeFeatureProviders";

import {
  registerCoreServices,
} from "../services/runtime/registerCoreServices";

import {
  registerFeatureServices,
} from "../services/runtime/registerFeatureServices";

import {
  initializeCoreServices,
} from "../services/runtime/initializeCoreServices";

import {
  registerDefaultRBAC,
} from "../rbac/registry/registerDefaultRBAC";

import {
  startCanonicalApiLayer,
} from "../api/canonical/runtime/startCanonicalApi";

import {
  initializeCanonicalHandlers,
} from "../handlers/canonical/runtime/initializeHandlers";

import {
  initializeBusRuntime,
} from "../busRuntime/runtime/initializeBusRuntime";

import {
  initializeCanonicalWorkflows,
} from "../workflows/runtime/initializeWorkflows";

import {
  initializePersistenceRuntime,
} from "../persistence/runtime/initializePersistence";

import {
  initializeCanonicalApi,
} from "../api/runtime/initializeCanonicalApi";

import {
  initializeApplicationFlows,
} from "../flows/runtime/initializeApplicationFlows";

import {
  initializeUiRuntime,
} from "../ui/runtime/initializeUiRuntime";

import {
  initializeWorkspaceRuntime,
} from "../workspace/runtime/initializeWorkspaceRuntime";

import {
  initializeCommandCenter,
} from "../commandCenter/runtime/initializeCommandCenter";

import {
  initializeNavigationRuntime,
} from "../navigation/runtime/initializeNavigationRuntime";

import {
  orchestrateGlobalState,
} from "../globalState/runtime/orchestrateGlobalState";

import {
  initializeDataFabric,
} from "../dataFabric/runtime/initializeDataFabric";

import {
  initializeOperationalViews,
} from "../operationalViews/runtime/initializeOperationalViews";

import {
  initializeCommandQuery,
} from "../commandQuery/runtime/initializeCommandQuery";

import {
  initializeEventStream,
} from "../eventStream/runtime/initializeEventStream";

import {
  initializeObservability,
} from "../observability/runtime/initializeObservability";

import {
  initializePolicyDecision,
} from "../policyDecision/runtime/initializePolicyDecision";

import {
  initializeWorkflowOrchestration,
} from "../workflowOrchestration/runtime/initializeWorkflowOrchestration";

import {
  initializeTransactionFabric,
} from "../transactionFabric/runtime/initializeTransactionFabric";

import {
  initializeStateMachine,
} from "../stateMachine/runtime/initializeStateMachine";

import {
  initializeRealtimeRuntime,
} from "../realtime/runtime/initializeRealtime";

import {
  startRuntimeOnce,
} from "../runtime/orchestration/startRuntimeOnce";

import {
  initializeCanonicalProjections,
} from "../projections/runtime/initializeProjections";

import {
  initializeRBAC,
} from "../rbac/state/rbacInitialization";

export function initializeCanonicalApplicationGraph(): void {
  registerCoreProviders();
  registerFeatureProviders();
  startCanonicalApiLayer();
  initializeCanonicalHandlers();
  initializeBusRuntime();
  initializeCanonicalProjections();
  initializeCanonicalWorkflows();
  initializePersistenceRuntime();
  initializeCanonicalApi();
  initializeApplicationFlows();
  initializeUiRuntime();
  initializeWorkspaceRuntime();
  initializeCommandCenter();
  initializeNavigationRuntime();
  orchestrateGlobalState();
  initializeDataFabric();
  initializeOperationalViews();
  initializeCommandQuery();
  initializeEventStream();
  initializeObservability();
  initializePolicyDecision();
  initializeWorkflowOrchestration();
  initializeTransactionFabric();
  initializeStateMachine();
  initializeRealtimeRuntime();
  startRuntimeOnce();

  initializeCoreProviders();
  initializeFeatureProviders();

  registerCoreServices();
  registerFeatureServices();

  initializeCoreServices();

  registerDefaultRBAC();
  initializeRBAC([
    "operator",
  ]);
}
