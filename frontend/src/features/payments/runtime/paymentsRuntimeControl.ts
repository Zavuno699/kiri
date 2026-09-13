import {
  getRuntimeControlModel,
} from "../../../components/runtime/control/runtimeControlModel";

export function getPaymentsRuntimeControl() {
  const model =
    getRuntimeControlModel();

  return {
    domain:
      "payments",

    runtime:
      model.state,

    subsystems:
      model.subsystems,
  };
}
