package repository

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

type AuditRepository interface {
	LogEvent(ctx context.Context, eventType string, actorID uuid.UUID, resourceType string, resourceID *uuid.UUID, oldValues map[string]interface{}, newValues map[string]interface{}, correlationID string, ipAddress string, userAgent string, success bool, errorMessage string) error
	LogAdminAction(ctx context.Context, eventType string, resourceType string, resourceID *uuid.UUID, actorID uuid.UUID, details map[string]interface{}) error
}

type DBAuditRepository struct {
	db *pgxpool.Pool
}

func NewAuditRepository(db *pgxpool.Pool) AuditRepository {
	return &DBAuditRepository{db: db}
}

func (r *DBAuditRepository) LogEvent(
	ctx context.Context,
	eventType string,
	actorID uuid.UUID,
	resourceType string,
	resourceID *uuid.UUID,
	oldValues map[string]interface{},
	newValues map[string]interface{},
	correlationID string,
	ipAddress string,
	userAgent string,
	success bool,
	errorMessage string,
) error {
	query := `
		INSERT INTO audit_log (
			event_type, actor_id, resource_type, resource_id,
			old_values, new_values, correlation_id, ip_address, user_agent,
			success, error_message, created_at
		) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
	`

	_, err := r.db.Exec(ctx, query,
		eventType, actorID, resourceType, resourceID,
		oldValues, newValues, correlationID, ipAddress, userAgent,
		success, errorMessage, time.Now(),
	)

	return err
}

func (r *DBAuditRepository) LogAdminAction(
	ctx context.Context,
	eventType string,
	resourceType string,
	resourceID *uuid.UUID,
	actorID uuid.UUID,
	details map[string]interface{},
) error {
	return r.LogEvent(
		ctx,
		eventType,
		actorID,
		resourceType,
		resourceID,
		nil,     // oldValues
		details, // newValues
		"",      // correlationID
		"",      // ipAddress
		"",      // userAgent
		true,    // success
		"",      // errorMessage
	)
}
