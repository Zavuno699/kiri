import type { FinalErrorCode } from "./finalErrorCode";

export class FinalApplicationError extends Error {
  readonly code: FinalErrorCode;
  readonly causeValue?: unknown;

  constructor(
    code: FinalErrorCode,
    message: string,
    causeValue?: unknown,
  ) {
    super(message);
    this.name = "FinalApplicationError";
    this.code = code;
    this.causeValue = causeValue;
  }
}
