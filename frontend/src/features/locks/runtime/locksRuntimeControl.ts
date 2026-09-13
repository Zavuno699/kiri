import {
  getRuntimeControlModel,
} from "../../../components/runtime/control/runtimeControlModel";

export function getLocksRuntimeControl() {
  const model =
    getRuntimeControlModel();

  return {
    domain:
      "locks",

    runtime:
      model.state,

    subsystems:
      model.subsystems,
  };
}
