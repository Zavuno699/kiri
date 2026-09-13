import {
  FinalApplicationError,
} from "./finalApplicationError";

export function normalizeFinalError(
  error: unknown,
): FinalApplicationError {
  if (error instanceof FinalApplicationError) {
    return error;
  }

  if (error instanceof Error) {
    return new FinalApplicationError(
      "INTEGRATION_FAILURE",
      error.message,
      error,
    );
  }

  return new FinalApplicationError(
    "INTEGRATION_FAILURE",
    String(error),
  );
}
