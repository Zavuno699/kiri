export async function runFlowStep<T>(
  key: string,
  operation: () => Promise<T>,
  completedSteps: string[],
): Promise<T> {
  try {
    const result =
      await operation();

    completedSteps.push(
      key,
    );

    return result;
  } catch (error) {
    throw new Error(
      `${key}: ${
        error instanceof Error
          ? error.message
          : String(error)
      }`,
    );
  }
}
