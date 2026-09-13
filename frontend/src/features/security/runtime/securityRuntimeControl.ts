import {
  getRuntimeControlModel,
} from "../../../components/runtime/control/runtimeControlModel";

export function getSecurityRuntimeControl() {
  const model =
    getRuntimeControlModel();

  return {
    domain:
      "security",

    runtime:
      model.state,

    subsystems:
      model.subsystems,
  };
}
