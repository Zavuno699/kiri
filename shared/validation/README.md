# Validation

Validation follows this pipeline:

1. Content-Type validation
2. Strict JSON decoding
3. Structural validation
4. Normalization
5. Field validation
6. Cross-field validation
7. Authorization
8. Domain/business validation
9. Transaction execution

Validation is not authorization.

Validation is not business logic.

Normalization must be explicit and deterministic.

Financial and security-sensitive values must never be silently
coerced into a different semantic value.
