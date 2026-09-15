package repository

import (
	"context"
	"errors"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/kirilock/backend/identity-service/internal/model"
)

var (
	ErrLandlordApplicationNotFound = errors.New("landlord application not found")
	ErrLandlordApplicationExists   = errors.New("landlord application already exists")
)

type LandlordApplicationRepository interface {
	Create(ctx context.Context, app *model.LandlordApplication) error
	GetByID(ctx context.Context, id uuid.UUID) (*model.LandlordApplication, error)
	GetBySubjectID(ctx context.Context, subjectID uuid.UUID) (*model.LandlordApplication, error)
	GetByReference(ctx context.Context, reference string) (*model.LandlordApplication, error)
	ListByStatus(ctx context.Context, status model.LandlordApplicationStatus) ([]*model.LandlordApplication, error)
	UpdateStatus(ctx context.Context, id uuid.UUID, status model.LandlordApplicationStatus, reviewerID *uuid.UUID, decision, reason, category *string) error
	UpdateVerification(ctx context.Context, id uuid.UUID, source string, result map[string]interface{}) error
	CreateResubmission(ctx context.Context, resub *model.LandlordApplicationResubmission) error
	GetResubmissions(ctx context.Context, applicationID uuid.UUID) ([]*model.LandlordApplicationResubmission, error)
}

type DBLandlordApplicationRepository struct {
	pool *pgxpool.Pool
}

func NewLandlordApplicationRepository(pool *pgxpool.Pool) LandlordApplicationRepository {
	return &DBLandlordApplicationRepository{pool: pool}
}

func (r *DBLandlordApplicationRepository) Create(ctx context.Context, app *model.LandlordApplication) error {
	query := `
		INSERT INTO landlord_applications (
			id, application_reference, subject_id, status, 
			submitted_at, terms_version, consent_timestamp,
			created_at, updated_at, version
		) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
		RETURNING id
	`

	err := r.pool.QueryRow(ctx, query,
		app.ID,
		app.ApplicationReference,
		app.SubjectID,
		app.Status,
		app.SubmittedAt,
		app.TermsVersion,
		app.ConsentTimestamp,
		app.CreatedAt,
		app.UpdatedAt,
		app.Version,
	).Scan(&app.ID)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return ErrLandlordApplicationExists
		}
		return err
	}

	return nil
}

func (r *DBLandlordApplicationRepository) GetByID(ctx context.Context, id uuid.UUID) (*model.LandlordApplication, error) {
	query := `
		SELECT id, application_reference, subject_id, status,
			   submitted_at, review_started_at, reviewed_at, verification_updated_at,
			   verification_source, verification_result,
			   reviewer_id, decision, decision_reason, decision_category,
			   terms_version, consent_timestamp, created_at, updated_at, version
		FROM landlord_applications
		WHERE id = $1
	`

	app := &model.LandlordApplication{}
	var verificationResult []byte

	err := r.pool.QueryRow(ctx, query, id).Scan(
		&app.ID,
		&app.ApplicationReference,
		&app.SubjectID,
		&app.Status,
		&app.SubmittedAt,
		&app.ReviewStartedAt,
		&app.ReviewedAt,
		&app.VerificationUpdatedAt,
		&app.VerificationSource,
		&verificationResult,
		&app.ReviewerID,
		&app.Decision,
		&app.DecisionReason,
		&app.DecisionCategory,
		&app.TermsVersion,
		&app.ConsentTimestamp,
		&app.CreatedAt,
		&app.UpdatedAt,
		&app.Version,
	)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, ErrLandlordApplicationNotFound
		}
		return nil, err
	}

	if len(verificationResult) > 0 {
		// Parse JSONB - simplified for now
		app.VerificationResult = make(map[string]interface{})
	}

	return app, nil
}

func (r *DBLandlordApplicationRepository) GetBySubjectID(ctx context.Context, subjectID uuid.UUID) (*model.LandlordApplication, error) {
	query := `
		SELECT id, application_reference, subject_id, status,
			   submitted_at, review_started_at, reviewed_at, verification_updated_at,
			   verification_source, verification_result,
			   reviewer_id, decision, decision_reason, decision_category,
			   terms_version, consent_timestamp, created_at, updated_at, version
		FROM landlord_applications
		WHERE subject_id = $1
		ORDER BY submitted_at DESC
		LIMIT 1
	`

	app := &model.LandlordApplication{}
	var verificationResult []byte

	err := r.pool.QueryRow(ctx, query, subjectID).Scan(
		&app.ID,
		&app.ApplicationReference,
		&app.SubjectID,
		&app.Status,
		&app.SubmittedAt,
		&app.ReviewStartedAt,
		&app.ReviewedAt,
		&app.VerificationUpdatedAt,
		&app.VerificationSource,
		&verificationResult,
		&app.ReviewerID,
		&app.Decision,
		&app.DecisionReason,
		&app.DecisionCategory,
		&app.TermsVersion,
		&app.ConsentTimestamp,
		&app.CreatedAt,
		&app.UpdatedAt,
		&app.Version,
	)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, ErrLandlordApplicationNotFound
		}
		return nil, err
	}

	if len(verificationResult) > 0 {
		app.VerificationResult = make(map[string]interface{})
	}

	return app, nil
}

func (r *DBLandlordApplicationRepository) GetByReference(ctx context.Context, reference string) (*model.LandlordApplication, error) {
	query := `
		SELECT id, application_reference, subject_id, status,
			   submitted_at, review_started_at, reviewed_at, verification_updated_at,
			   verification_source, verification_result,
			   reviewer_id, decision, decision_reason, decision_category,
			   terms_version, consent_timestamp, created_at, updated_at, version
		FROM landlord_applications
		WHERE application_reference = $1
	`

	app := &model.LandlordApplication{}
	var verificationResult []byte

	err := r.pool.QueryRow(ctx, query, reference).Scan(
		&app.ID,
		&app.ApplicationReference,
		&app.SubjectID,
		&app.Status,
		&app.SubmittedAt,
		&app.ReviewStartedAt,
		&app.ReviewedAt,
		&app.VerificationUpdatedAt,
		&app.VerificationSource,
		&verificationResult,
		&app.ReviewerID,
		&app.Decision,
		&app.DecisionReason,
		&app.DecisionCategory,
		&app.TermsVersion,
		&app.ConsentTimestamp,
		&app.CreatedAt,
		&app.UpdatedAt,
		&app.Version,
	)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, ErrLandlordApplicationNotFound
		}
		return nil, err
	}

	if len(verificationResult) > 0 {
		app.VerificationResult = make(map[string]interface{})
	}

	return app, nil
}

func (r *DBLandlordApplicationRepository) ListByStatus(ctx context.Context, status model.LandlordApplicationStatus) ([]*model.LandlordApplication, error) {
	query := `
		SELECT id, application_reference, subject_id, status,
			   submitted_at, review_started_at, reviewed_at, verification_updated_at,
			   verification_source, verification_result,
			   reviewer_id, decision, decision_reason, decision_category,
			   terms_version, consent_timestamp, created_at, updated_at, version
		FROM landlord_applications
		WHERE status = $1
		ORDER BY submitted_at DESC
	`

	rows, err := r.pool.Query(ctx, query, status)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var apps []*model.LandlordApplication
	for rows.Next() {
		app := &model.LandlordApplication{}
		var verificationResult []byte

		err := rows.Scan(
			&app.ID,
			&app.ApplicationReference,
			&app.SubjectID,
			&app.Status,
			&app.SubmittedAt,
			&app.ReviewStartedAt,
			&app.ReviewedAt,
			&app.VerificationUpdatedAt,
			&app.VerificationSource,
			&verificationResult,
			&app.ReviewerID,
			&app.Decision,
			&app.DecisionReason,
			&app.DecisionCategory,
			&app.TermsVersion,
			&app.ConsentTimestamp,
			&app.CreatedAt,
			&app.UpdatedAt,
			&app.Version,
		)

		if err != nil {
			return nil, err
		}

		if len(verificationResult) > 0 {
			app.VerificationResult = make(map[string]interface{})
		}

		apps = append(apps, app)
	}

	return apps, nil
}

func (r *DBLandlordApplicationRepository) UpdateStatus(ctx context.Context, id uuid.UUID, status model.LandlordApplicationStatus, reviewerID *uuid.UUID, decision, reason, category *string) error {
	query := `
		UPDATE landlord_applications
		SET status = $2,
		    reviewer_id = $3,
		    decision = $4,
		    decision_reason = $5,
		    decision_category = $6,
		    reviewed_at = CASE WHEN $7 THEN NOW() ELSE reviewed_at END,
		    review_started_at = CASE WHEN $8 THEN NOW() ELSE review_started_at END,
		    updated_at = NOW(),
		    version = version + 1
		WHERE id = $1
		RETURNING version
	`

	var newVersion int
	var startReview bool
	var completeReview bool

	if status == model.LandlordApplicationStatusPendingVerification {
		startReview = true
		completeReview = false
	} else if status == model.LandlordApplicationStatusApproved ||
		status == model.LandlordApplicationStatusRejected ||
		status == model.LandlordApplicationStatusMoreInformationRequired {
		startReview = false
		completeReview = true
	} else {
		startReview = false
		completeReview = false
	}

	err := r.pool.QueryRow(ctx, query, id, status, reviewerID, decision, reason, category, completeReview, startReview).Scan(&newVersion)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return ErrLandlordApplicationNotFound
		}
		return err
	}

	return nil
}

func (r *DBLandlordApplicationRepository) UpdateVerification(ctx context.Context, id uuid.UUID, source string, result map[string]interface{}) error {
	query := `
		UPDATE landlord_applications
		SET verification_source = $2,
		    verification_result = $3,
		    verification_updated_at = NOW(),
		    updated_at = NOW(),
		    version = version + 1
		WHERE id = $1
		RETURNING version
	`

	var newVersion int
	err := r.pool.QueryRow(ctx, query, id, source, result).Scan(&newVersion)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return ErrLandlordApplicationNotFound
		}
		return err
	}

	return nil
}

func (r *DBLandlordApplicationRepository) CreateResubmission(ctx context.Context, resub *model.LandlordApplicationResubmission) error {
	query := `
		INSERT INTO landlord_application_resubmissions (
			id, application_id, previous_status, previous_decision,
			previous_decision_reason, previous_decision_category,
			previous_reviewer_id, previous_reviewed_at,
			resubmitted_at, resubmission_notes, created_at
		) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
		RETURNING id
	`

	err := r.pool.QueryRow(ctx, query,
		resub.ID,
		resub.ApplicationID,
		resub.PreviousStatus,
		resub.PreviousDecision,
		resub.PreviousDecisionReason,
		resub.PreviousDecisionCategory,
		resub.PreviousReviewerID,
		resub.PreviousReviewedAt,
		resub.ResubmittedAt,
		resub.ResubmissionNotes,
		resub.CreatedAt,
	).Scan(&resub.ID)

	if err != nil {
		return err
	}

	return nil
}

func (r *DBLandlordApplicationRepository) GetResubmissions(ctx context.Context, applicationID uuid.UUID) ([]*model.LandlordApplicationResubmission, error) {
	query := `
		SELECT id, application_id, previous_status, previous_decision,
			   previous_decision_reason, previous_decision_category,
			   previous_reviewer_id, previous_reviewed_at,
			   resubmitted_at, resubmission_notes, created_at
		FROM landlord_application_resubmissions
		WHERE application_id = $1
		ORDER BY resubmitted_at DESC
	`

	rows, err := r.pool.Query(ctx, query, applicationID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var resubs []*model.LandlordApplicationResubmission
	for rows.Next() {
		resub := &model.LandlordApplicationResubmission{}

		err := rows.Scan(
			&resub.ID,
			&resub.ApplicationID,
			&resub.PreviousStatus,
			&resub.PreviousDecision,
			&resub.PreviousDecisionReason,
			&resub.PreviousDecisionCategory,
			&resub.PreviousReviewerID,
			&resub.PreviousReviewedAt,
			&resub.ResubmittedAt,
			&resub.ResubmissionNotes,
			&resub.CreatedAt,
		)

		if err != nil {
			return nil, err
		}

		resubs = append(resubs, resub)
	}

	return resubs, nil
}
