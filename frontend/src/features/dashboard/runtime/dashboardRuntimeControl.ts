import {
  getRuntimeControlModel,
} from "../../../components/runtime/control/runtimeControlModel";

export function getDashboardRuntimeControl() {
  const model =
    getRuntimeControlModel();

  return {
    domain:
      "dashboard",

    runtime:
      model.state,

    subsystems:
      model.subsystems,
  };
}
