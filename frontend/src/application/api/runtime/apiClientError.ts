import type {
  CanonicalApiError,
} from "../contracts/apiError";

export class CanonicalApiClientError
  extends Error
{
  readonly details: CanonicalApiError;

  constructor(
    details: CanonicalApiError,
  ) {
    super(details.message);
    this.name =
      "CanonicalApiClientError";
    this.details =
      details;
  }
}
