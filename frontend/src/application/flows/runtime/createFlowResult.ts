export function createFlowResult<T>(
  flowId: string,
  data: T | null,
  completedSteps: string[],
  failedStep: string | null = null,
  error: string | null = null,
) {
  return {
    flowId,
    success:
      failedStep === null &&
      error === null,
    data,
    completedSteps: [
      ...completedSteps,
    ],
    failedStep,
    error,
  };
}
