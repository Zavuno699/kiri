import {
  getRuntimeControlModel,
} from "../../../components/runtime/control/runtimeControlModel";

export function getDevicesRuntimeControl() {
  const model =
    getRuntimeControlModel();

  return {
    domain:
      "devices",

    runtime:
      model.state,

    subsystems:
      model.subsystems,
  };
}
