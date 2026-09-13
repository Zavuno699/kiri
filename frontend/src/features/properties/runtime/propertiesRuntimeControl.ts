import {
  getRuntimeControlModel,
} from "../../../components/runtime/control/runtimeControlModel";

export function getPropertiesRuntimeControl() {
  const model =
    getRuntimeControlModel();

  return {
    domain:
      "properties",

    runtime:
      model.state,

    subsystems:
      model.subsystems,
  };
}
