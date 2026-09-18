package security

// Lock authorization is implemented in identity-service
// The identity-service has the authoritative implementation at:
// backend/identity-service/internal/service/lock_authorization.go
// which uses real repositories (TenancyRepository, LockAssignmentRepository, etc.)
// This placeholder file is removed to avoid confusion between competing implementations
