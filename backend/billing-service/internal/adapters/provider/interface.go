package provider

import (
	"context"
)

// PaymentProviderAdapter defines the interface for payment provider integrations
// This abstraction allows for multiple payment providers while maintaining consistent behavior
type PaymentProviderAdapter interface {
	// InitiatePayment initiates a payment through the provider
	// Returns a provider transaction ID and any required payment metadata
	InitiatePayment(ctx context.Context, request InitiatePaymentRequest) (InitiatePaymentResponse, error)
	
	// VerifyPayment verifies the status of a payment with the provider
	// Used for reconciliation and status updates
	VerifyPayment(ctx context.Context, transactionID string) (VerifyPaymentResponse, error)
	
	// LookupPayment retrieves payment details from the provider
	LookupPayment(ctx context.Context, transactionID string) (LookupPaymentResponse, error)
	
	// ProcessWebhook handles incoming webhook notifications from the provider
	// Must verify signature, validate payload, enforce idempotency
	ProcessWebhook(ctx context.Context, webhook WebhookPayload) (WebhookProcessingResult, error)
	
	// SettlePayment processes settlement for a confirmed payment
	SettlePayment(ctx context.Context, request SettlePaymentRequest) (SettlePaymentResponse, error)
	
	// RefundPayment processes a refund (if supported by the provider)
	RefundPayment(ctx context.Context, request RefundPaymentRequest) (RefundPaymentResponse, error)
}

// InitiatePaymentRequest contains payment initiation details
type InitiatePaymentRequest struct {
	Amount           int64  // Amount in minor units (never floating point)
	Currency         string // ISO 4217 currency code
	PaymentReference string // Internal payment reference
	CustomerEmail    string
	CustomerName     string
	Description      string
	Metadata         map[string]string
}

// InitiatePaymentResponse contains the result of payment initiation
type InitiatePaymentResponse struct {
	ProviderTransactionID string
	PaymentURL           string // URL for customer to complete payment
	ExpiresAt            string // Expiration timestamp if applicable
	Status               string
	Metadata             map[string]string
}

// VerifyPaymentResponse contains payment verification results
type VerifyPaymentResponse struct {
	ProviderTransactionID string
	Status               string
	Amount               int64
	Currency             string
	PaidAt              string
	Metadata             map[string]string
}

// LookupPaymentResponse contains detailed payment information
type LookupPaymentResponse struct {
	ProviderTransactionID string
	Status               string
	Amount               int64
	Currency             string
	CustomerEmail        string
	CustomerName         string
	Description          string
	CreatedAt            string
	UpdatedAt            string
	Metadata             map[string]string
}

// WebhookPayload represents an incoming webhook notification
type WebhookPayload struct {
	RawBody      []byte
	Signature    string
	Headers      map[string]string
	EventType    string
	EventData    map[string]interface{}
}

// WebhookProcessingResult contains webhook processing results
type WebhookProcessingResult struct {
	Success              bool
	ProviderTransactionID string
	Status               string
	Amount               int64
	Currency             string
	IdempotencyKey       string
	Error                string
}

// SettlePaymentRequest contains settlement details
type SettlePaymentRequest struct {
	ProviderTransactionID string
	Amount               int64
	Currency             string
	SettlementReference  string
}

// SettlePaymentResponse contains settlement results
type SettlePaymentResponse struct {
	SettlementID         string
	ProviderTransactionID string
	Status               string
	SettledAmount        int64
	SettledCurrency      string
	FeeAmount            int64
	NetAmount            int64
}

// RefundPaymentRequest contains refund details
type RefundPaymentRequest struct {
	ProviderTransactionID string
	Amount               int64
	Currency             string
	Reason               string
	Reference            string
}

// RefundPaymentResponse contains refund results
type RefundPaymentResponse struct {
	RefundID             string
	ProviderTransactionID string
	Status               string
	RefundedAmount        int64
	RefundedCurrency      string
	FeeAmount            int64
	NetRefundAmount      int64
}

// WebhookSignatureVerifier defines the interface for webhook signature verification
type WebhookSignatureVerifier interface {
	// Verify verifies the webhook signature using the provider's method
	Verify(rawBody []byte, signature string, secret string) bool
	
	// ExtractSignature extracts the signature from webhook headers
	ExtractSignature(headers map[string]string) string
}

// IdempotencyKey represents a unique identifier for idempotency
type IdempotencyKey string

// IdempotencyChecker defines the interface for checking idempotency
type IdempotencyChecker interface {
	// Check checks if an operation with the given key has already been processed
	Check(ctx context.Context, key IdempotencyKey) (bool, error)
	
	// Record records that an operation with the given key has been processed
	Record(ctx context.Context, key IdempotencyKey, result interface{}) error
}
