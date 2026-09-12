package service

import (
	"context"
	"database/sql"

	"sync"
	"testing"
	"time"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/google/uuid"

	"github.com/kirilock/backend/billing-service/internal/model"
	"github.com/kirilock/backend/billing-service/internal/repository"
)

type countingPaymentProvider struct {
	mu      sync.Mutex
	calls   int
	payment model.ProviderPayment
}

func (p *countingPaymentProvider) CreatePayment(
	_ context.Context,
	_ CreatePaymentRequest,
) (model.ProviderPayment, error) {
	p.mu.Lock()
	p.calls++
	p.mu.Unlock()

	return p.payment, nil
}

func (p *countingPaymentProvider) VerifyPayment(
	_ context.Context,
	_ string,
) (model.ProviderPayment, error) {
	return model.ProviderPayment{}, nil
}

func (p *countingPaymentProvider) Calls() int {
	p.mu.Lock()
	defer p.mu.Unlock()
	return p.calls
}

func TestPaymentApplicationConcurrentSameIdempotencyKey(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()

	repo := repository.NewPaymentRepository(db)

	provider := &countingPaymentProvider{
		payment: model.ProviderPayment{
			ID:        "flw-concurrent-001",
			Reference: "KIRI-CONCURRENT-001",
			Amount:    20000,
			Currency:  "UGX",
			Status:    "PENDING",
		},
	}

	application, err := NewPaymentApplication(provider, repo)
	if err != nil {
		t.Fatal(err)
	}

	tenantID := uuid.New()

	request := CreatePaymentRequest{
		Reference:      "KIRI-CONCURRENT-001",
		Amount:         20000,
		Currency:       "UGX",
		CustomerEmail:  "tenant@example.com",
		CustomerPhone:  "+256700000000",
		Network:        "MTN",
		CountryCode:    "UG",
		IdempotencyKey: "concurrent-idempotency-001",
		TraceID:        "trace-concurrent-001",
	}

	requestHash, err := PaymentRequestHash(request)
	if err != nil {
		t.Fatal(err)
	}

	// First request owns the key.
	mock.ExpectQuery("SELECT .*FROM payments.*WHERE provider").
		WithArgs("FLUTTERWAVE", request.IdempotencyKey).
		WillReturnError(sql.ErrNoRows)

	mock.ExpectExec("INSERT INTO payment_idempotency_claims").
		WillReturnResult(sqlmock.NewResult(1, 1))

	mock.ExpectExec("INSERT INTO payments").
		WillReturnResult(sqlmock.NewResult(1, 1))

	mock.ExpectExec("UPDATE payment_idempotency_claims").
		WillReturnResult(sqlmock.NewResult(1, 1))

	_, err = application.CreatePendingPayment(
		context.Background(),
		tenantID,
		request,
	)
	if err != nil {
		t.Fatalf("first request error = %v", err)
	}

	// The identical second request is now a replay. The payment lookup
	// represents the durable result of the first request, so the provider
	// must not be contacted again.
	paymentID := uuid.New()

	mock.ExpectQuery("SELECT .*FROM payments.*WHERE provider").
		WithArgs("FLUTTERWAVE", request.IdempotencyKey).
		WillReturnRows(
			sqlmock.NewRows([]string{
				"id",
				"tenant_id",
				"reference",
				"provider",
				"provider_charge_id",
				"amount_ugx",
				"currency",
				"status",
				"idempotency_key",
				"request_hash",
				"correlation_id",
				"created_at",
				"updated_at",
				"settled_at",
				"version",
			}).AddRow(
				paymentID,
				tenantID,
				request.Reference,
				"FLUTTERWAVE",
				provider.payment.ID,
				request.Amount,
				request.Currency,
				model.PaymentPending,
				request.IdempotencyKey,
				requestHash,
				request.TraceID,
				time.Now().UTC(),
				time.Now().UTC(),
				nil,
				int64(1),
			),
		)

	_, err = application.CreatePendingPayment(
		context.Background(),
		tenantID,
		request,
	)
	if err != nil {
		t.Fatalf("second identical request error = %v", err)
	}

	if provider.Calls() != 1 {
		t.Fatalf(
			"expected exactly one provider call for repeated identical requests, got %d",
			provider.Calls(),
		)
	}

	if err := mock.ExpectationsWereMet(); err != nil {
		t.Fatalf("unmet SQL expectations: %v", err)
	}
}
