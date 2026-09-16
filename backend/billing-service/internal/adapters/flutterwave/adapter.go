package flutterwave

import (
	"context"
	"encoding/json"
	"fmt"
	"log"

	"github.com/kirilock/backend/billing-service/internal/adapters/provider"
	flutterwaveClient "github.com/kirilock/backend/billing-service/internal/flutterwave"
)

// FlutterwaveAdapter implements the PaymentProviderAdapter interface for Flutterwave
type FlutterwaveAdapter struct {
	apiKey    string
	secretKey string
	client    *flutterwaveClient.Client
	verifier  *SignatureVerifier
}

func NewFlutterwaveAdapter(apiKey, secretKey string) (*FlutterwaveAdapter, error) {
	cfg := flutterwaveClient.Config{
		BaseURL:      "https://api.flutterwave.com/v3",
		ClientID:     apiKey,
		ClientSecret: secretKey,
		Timeout:      15 * 1000000000, // 15 seconds in nanoseconds
	}

	client, err := flutterwaveClient.NewClient(cfg)
	if err != nil {
		return nil, err
	}

	return &FlutterwaveAdapter{
		apiKey:    apiKey,
		secretKey: secretKey,
		client:    client,
		verifier:  NewSignatureVerifier(),
	}, nil
}

func (a *FlutterwaveAdapter) InitiatePayment(ctx context.Context, request provider.InitiatePaymentRequest) (provider.InitiatePaymentResponse, error) {
	// Flutterwave payment initiation implementation
	// This would call the Flutterwave API to create a payment
	return provider.InitiatePaymentResponse{}, fmt.Errorf("flutterwave adapter: InitiatePayment not yet implemented")
}

func (a *FlutterwaveAdapter) VerifyPayment(ctx context.Context, transactionID string) (provider.VerifyPaymentResponse, error) {
	// Flutterwave payment verification implementation
	return provider.VerifyPaymentResponse{}, fmt.Errorf("flutterwave adapter: VerifyPayment not yet implemented")
}

func (a *FlutterwaveAdapter) LookupPayment(ctx context.Context, transactionID string) (provider.LookupPaymentResponse, error) {
	// Flutterwave payment lookup implementation
	return provider.LookupPaymentResponse{}, fmt.Errorf("flutterwave adapter: LookupPayment not yet implemented")
}

func (a *FlutterwaveAdapter) ProcessWebhook(ctx context.Context, webhook provider.WebhookPayload) (provider.WebhookProcessingResult, error) {
	// Verify signature first
	if !a.verifier.Verify(webhook.RawBody, webhook.Signature, a.secretKey) {
		return provider.WebhookProcessingResult{
			Success: false,
			Error:   "Invalid webhook signature",
		}, nil
	}

	// Parse webhook event data
	var eventData map[string]interface{}
	if err := json.Unmarshal(webhook.RawBody, &eventData); err != nil {
		return provider.WebhookProcessingResult{
			Success: false,
			Error:   fmt.Sprintf("Failed to parse webhook: %v", err),
		}, nil
	}

	// Extract relevant fields
	txRef, _ := eventData["tx_ref"].(string)
	status, _ := eventData["status"].(string)
	amount, _ := eventData["amount"].(float64)
	currency, _ := eventData["currency"].(string)

	// Log webhook processing for audit (never log secrets)
	log.Printf("Webhook processed: tx_ref=%s, status=%s, amount=%f %s", txRef, status, amount, currency)

	return provider.WebhookProcessingResult{
		Success:               true,
		ProviderTransactionID: txRef,
		Status:                status,
		Amount:                int64(amount), // Convert to minor units
		Currency:              currency,
	}, nil
}

func (a *FlutterwaveAdapter) SettlePayment(ctx context.Context, request provider.SettlePaymentRequest) (provider.SettlePaymentResponse, error) {
	// Flutterwave settlement implementation
	return provider.SettlePaymentResponse{}, fmt.Errorf("flutterwave adapter: SettlePayment not yet implemented")
}

func (a *FlutterwaveAdapter) RefundPayment(ctx context.Context, request provider.RefundPaymentRequest) (provider.RefundPaymentResponse, error) {
	// Flutterwave refund implementation
	return provider.RefundPaymentResponse{}, fmt.Errorf("flutterwave adapter: RefundPayment not yet implemented")
}

// SignatureVerifier implements the WebhookSignatureVerifier interface
type SignatureVerifier struct{}

func NewSignatureVerifier() *SignatureVerifier {
	return &SignatureVerifier{}
}

func (v *SignatureVerifier) Verify(rawBody []byte, signature string, secret string) bool {
	return flutterwaveClient.VerifySignature(rawBody, signature, secret)
}

func (v *SignatureVerifier) ExtractSignature(headers map[string]string) string {
	return flutterwaveClient.ExtractSignature(headers)
}
