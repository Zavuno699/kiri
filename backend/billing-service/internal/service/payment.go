package service

import (
	"errors"
	"sync"
	"time"

	"github.com/google/uuid"
	"github.com/kirilock/backend/billing-service/internal/model"
)

var (
	ErrIdempotencyConflict = errors.New("idempotency key already used with different request")
)

type paymentRecord struct {
	fingerprint string
	result      model.PaymentResult
}

type PaymentService struct {
	mu      sync.Mutex
	records map[string]paymentRecord
}

func NewPaymentService() *PaymentService {
	return &PaymentService{
		records: make(map[string]paymentRecord),
	}
}

func (s *PaymentService) Create(
	request model.PaymentRequest,
	fingerprint string,
) (model.PaymentResult, bool, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	if existing, ok := s.records[request.IdempotencyKey]; ok {
		if existing.fingerprint != fingerprint {
			return model.PaymentResult{}, false, ErrIdempotencyConflict
		}

		return existing.result, true, nil
	}

	result := model.PaymentResult{
		PaymentID:      uuid.NewString(),
		Status:         model.PaymentStatusAccepted,
		TenantPhone:    request.TenantPhone,
		AmountMinor:    request.AmountMinor,
		DaysRequested:  request.DaysRequested,
		CurrencyCode:   request.CurrencyCode,
		IdempotencyKey: request.IdempotencyKey,
		CreatedAt:      time.Now().UTC(),
	}

	s.records[request.IdempotencyKey] = paymentRecord{
		fingerprint: fingerprint,
		result:      result,
	}

	return result, false, nil
}
