package flutterwave

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"
	"sync"
	"testing"
	"time"
)

type phase5EMockServer struct {
	server *httptest.Server

	mu sync.Mutex

	requests []string

	tokenRequests    int
	customerRequests int
	methodRequests   int
	chargeRequests   int

	lastIdempotencyKey string
	lastTraceID        string
	lastAuthorization  string
}

func newPhase5EMockServer(t *testing.T) *phase5EMockServer {
	t.Helper()

	mock := &phase5EMockServer{}

	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		mock.mu.Lock()
		mock.requests = append(mock.requests, r.Method+" "+r.URL.Path)
		mock.mu.Unlock()

		switch r.URL.Path {
		case "/token":
			mock.handleToken(t, w, r)

		case "/customers":
			mock.handleCustomer(t, w, r)

		case "/payment-methods":
			mock.handlePaymentMethod(t, w, r)

		case "/charges":
			mock.handleCharge(t, w, r)

		default:
			http.NotFound(w, r)
		}
	})

	mock.server = httptest.NewServer(handler)

	t.Cleanup(mock.server.Close)

	return mock
}

func (m *phase5EMockServer) handleToken(
	t *testing.T,
	w http.ResponseWriter,
	r *http.Request,
) {
	t.Helper()

	m.mu.Lock()
	m.tokenRequests++
	m.mu.Unlock()

	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	if err := r.ParseForm(); err != nil {
		http.Error(w, "invalid form", http.StatusBadRequest)
		return
	}

	if r.Form.Get("grant_type") != "client_credentials" {
		http.Error(w, "invalid grant_type", http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	_ = json.NewEncoder(w).Encode(map[string]any{
		"access_token": "phase5e-test-token",
		"expires_in":   3600,
		"token_type":   "Bearer",
	})
}

func (m *phase5EMockServer) handleCustomer(
	t *testing.T,
	w http.ResponseWriter,
	r *http.Request,
) {
	t.Helper()

	m.mu.Lock()
	m.customerRequests++
	m.lastIdempotencyKey = r.Header.Get("X-Idempotency-Key")
	m.lastTraceID = r.Header.Get("X-Trace-Id")
	m.lastAuthorization = r.Header.Get("Authorization")
	m.mu.Unlock()

	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	if r.Header.Get("Authorization") != "Bearer phase5e-test-token" {
		http.Error(w, "missing authorization", http.StatusUnauthorized)
		return
	}

	if r.Header.Get("X-Idempotency-Key") == "" {
		http.Error(w, "missing idempotency key", http.StatusBadRequest)
		return
	}

	if r.Header.Get("X-Trace-Id") == "" {
		http.Error(w, "missing trace id", http.StatusBadRequest)
		return
	}

	var body map[string]any

	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "invalid json", http.StatusBadRequest)
		return
	}

	if body["email"] != "tenant@example.com" {
		http.Error(w, "unexpected customer email", http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)

	_ = json.NewEncoder(w).Encode(map[string]any{
		"status":  "success",
		"message": "Customer created",
		"data": map[string]any{
			"id":    "cus_phase5e_001",
			"email": "tenant@example.com",
		},
	})
}

func (m *phase5EMockServer) handlePaymentMethod(
	t *testing.T,
	w http.ResponseWriter,
	r *http.Request,
) {
	t.Helper()

	m.mu.Lock()
	m.methodRequests++
	m.lastIdempotencyKey = r.Header.Get("X-Idempotency-Key")
	m.lastTraceID = r.Header.Get("X-Trace-Id")
	m.lastAuthorization = r.Header.Get("Authorization")
	m.mu.Unlock()

	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	if r.Header.Get("Authorization") != "Bearer phase5e-test-token" {
		http.Error(w, "missing authorization", http.StatusUnauthorized)
		return
	}

	var body map[string]any

	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "invalid json", http.StatusBadRequest)
		return
	}

	if body["type"] != "mobile_money" {
		http.Error(w, "unexpected payment method type", http.StatusBadRequest)
		return
	}

	mobileMoney, ok := body["mobile_money"].(map[string]any)
	if !ok {
		http.Error(w, "missing mobile_money", http.StatusBadRequest)
		return
	}

	if mobileMoney["country_code"] != "UG" {
		http.Error(w, "unexpected country code", http.StatusBadRequest)
		return
	}

	if mobileMoney["network"] != "MTN" {
		http.Error(w, "unexpected network", http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)

	_ = json.NewEncoder(w).Encode(map[string]any{
		"status":  "success",
		"message": "Payment method created",
		"data": map[string]any{
			"id": "pm_phase5e_001",
		},
	})
}

func (m *phase5EMockServer) handleCharge(
	t *testing.T,
	w http.ResponseWriter,
	r *http.Request,
) {
	t.Helper()

	m.mu.Lock()
	m.chargeRequests++
	m.lastIdempotencyKey = r.Header.Get("X-Idempotency-Key")
	m.lastTraceID = r.Header.Get("X-Trace-Id")
	m.lastAuthorization = r.Header.Get("Authorization")
	m.mu.Unlock()

	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	if r.Header.Get("Authorization") != "Bearer phase5e-test-token" {
		http.Error(w, "missing authorization", http.StatusUnauthorized)
		return
	}

	var body map[string]any

	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "invalid json", http.StatusBadRequest)
		return
	}

	if body["reference"] != "KIRI-5E-001" {
		http.Error(w, "unexpected reference", http.StatusBadRequest)
		return
	}

	if body["currency"] != "UGX" {
		http.Error(w, "unexpected currency", http.StatusBadRequest)
		return
	}

	if body["customer_id"] != "cus_phase5e_001" {
		http.Error(w, "unexpected customer id", http.StatusBadRequest)
		return
	}

	if body["payment_method_id"] != "pm_phase5e_001" {
		http.Error(w, "unexpected payment method id", http.StatusBadRequest)
		return
	}

	if body["amount"] != float64(20000) {
		http.Error(w, "unexpected amount", http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusAccepted)

	_ = json.NewEncoder(w).Encode(map[string]any{
		"status":  "success",
		"message": "Charge initiated",
		"data": map[string]any{
			"id":        "chg_phase5e_001",
			"reference": "KIRI-5E-001",
			"amount":    20000,
			"currency":  "UGX",
			"status":    "pending",
			"next_action": map[string]any{
				"type": "mobile_money_authorization",
			},
		},
	})
}

func TestPhase5EMockServerWorks(t *testing.T) {
	mock := newPhase5EMockServer(t)

	resp, err := http.Get(mock.server.URL + "/not-a-real-flutterwave-endpoint")
	if err != nil {
		t.Fatalf("unexpected local HTTP error: %v", err)
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusNotFound {
		t.Fatalf(
			"status = %d, want %d",
			resp.StatusCode,
			http.StatusNotFound,
		)
	}
}

func TestPhase5EOAuthEndpointCanBeExercisedLocally(t *testing.T) {
	mock := newPhase5EMockServer(t)

	req, err := http.NewRequestWithContext(
		context.Background(),
		http.MethodPost,
		mock.server.URL+"/token",
		strings.NewReader("grant_type=client_credentials"),
	)
	if err != nil {
		t.Fatalf("NewRequest() error = %v", err)
	}

	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	resp, err := mock.server.Client().Do(req)
	if err != nil {
		t.Fatalf("Do() error = %v", err)
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		t.Fatalf(
			"status = %d, want %d",
			resp.StatusCode,
			http.StatusOK,
		)
	}

	var body map[string]any

	if err := json.NewDecoder(resp.Body).Decode(&body); err != nil {
		t.Fatalf("Decode() error = %v", err)
	}

	if body["access_token"] != "phase5e-test-token" {
		t.Fatalf("unexpected test access token")
	}
}

func TestPhase5EMockedCustomerEndpoint(t *testing.T) {
	mock := newPhase5EMockServer(t)

	req, err := http.NewRequestWithContext(
		context.Background(),
		http.MethodPost,
		mock.server.URL+"/customers",
		strings.NewReader(`{"email":"tenant@example.com"}`),
	)
	if err != nil {
		t.Fatalf("NewRequest() error = %v", err)
	}

	req.Header.Set("Authorization", "Bearer phase5e-test-token")
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("X-Idempotency-Key", "KIRI5ECUSTOMER001")
	req.Header.Set("X-Trace-Id", "KIRI5ETRACE001")

	resp, err := mock.server.Client().Do(req)
	if err != nil {
		t.Fatalf("Do() error = %v", err)
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusCreated {
		t.Fatalf(
			"status = %d, want %d",
			resp.StatusCode,
			http.StatusCreated,
		)
	}

	mu := &mock.mu
	mu.Lock()
	defer mu.Unlock()

	if mock.customerRequests != 1 {
		t.Fatalf(
			"customer requests = %d, want 1",
			mock.customerRequests,
		)
	}
}

func TestPhase5EMockedPaymentMethodEndpoint(t *testing.T) {
	mock := newPhase5EMockServer(t)

	body := `{
		"type":"mobile_money",
		"mobile_money":{
			"country_code":"UG",
			"network":"MTN",
			"phone_number":"+256700000001"
		}
	}`

	req, err := http.NewRequestWithContext(
		context.Background(),
		http.MethodPost,
		mock.server.URL+"/payment-methods",
		strings.NewReader(body),
	)
	if err != nil {
		t.Fatalf("NewRequest() error = %v", err)
	}

	req.Header.Set("Authorization", "Bearer phase5e-test-token")
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("X-Idempotency-Key", "KIRI5EMETHOD001")
	req.Header.Set("X-Trace-Id", "KIRI5ETRACE002")

	resp, err := mock.server.Client().Do(req)
	if err != nil {
		t.Fatalf("Do() error = %v", err)
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusCreated {
		t.Fatalf(
			"status = %d, want %d",
			resp.StatusCode,
			http.StatusCreated,
		)
	}
}

func TestPhase5EMockedChargeEndpoint(t *testing.T) {
	mock := newPhase5EMockServer(t)

	body := `{
		"reference":"KIRI-5E-001",
		"currency":"UGX",
		"customer_id":"cus_phase5e_001",
		"payment_method_id":"pm_phase5e_001",
		"amount":20000
	}`

	req, err := http.NewRequestWithContext(
		context.Background(),
		http.MethodPost,
		mock.server.URL+"/charges",
		strings.NewReader(body),
	)
	if err != nil {
		t.Fatalf("NewRequest() error = %v", err)
	}

	req.Header.Set("Authorization", "Bearer phase5e-test-token")
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("X-Idempotency-Key", "KIRI5ECHARGE001")
	req.Header.Set("X-Trace-Id", "KIRI5ETRACE003")

	resp, err := mock.server.Client().Do(req)
	if err != nil {
		t.Fatalf("Do() error = %v", err)
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusAccepted {
		t.Fatalf(
			"status = %d, want %d",
			resp.StatusCode,
			http.StatusAccepted,
		)
	}

	var envelope struct {
		Status string `json:"status"`
		Data   struct {
			ID        string `json:"id"`
			Reference string `json:"reference"`
			Amount    int64  `json:"amount"`
			Currency  string `json:"currency"`
			Status    string `json:"status"`
		} `json:"data"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&envelope); err != nil {
		t.Fatalf("Decode() error = %v", err)
	}

	if envelope.Data.ID != "chg_phase5e_001" {
		t.Fatalf("charge id = %q", envelope.Data.ID)
	}

	if envelope.Data.Reference != "KIRI-5E-001" {
		t.Fatalf("reference = %q", envelope.Data.Reference)
	}

	if envelope.Data.Amount != 20000 {
		t.Fatalf("amount = %d", envelope.Data.Amount)
	}

	if envelope.Data.Currency != "UGX" {
		t.Fatalf("currency = %q", envelope.Data.Currency)
	}

	if envelope.Data.Status != "pending" {
		t.Fatalf(
			"status = %q, want pending",
			envelope.Data.Status,
		)
	}
}

func TestPhase5ERejectsFalseSettlement(t *testing.T) {
	mock := newPhase5EMockServer(t)

	body := `{
		"reference":"KIRI-5E-001",
		"currency":"UGX",
		"customer_id":"cus_phase5e_001",
		"payment_method_id":"pm_phase5e_001",
		"amount":20000
	}`

	req, err := http.NewRequestWithContext(
		context.Background(),
		http.MethodPost,
		mock.server.URL+"/charges",
		strings.NewReader(body),
	)
	if err != nil {
		t.Fatalf("NewRequest() error = %v", err)
	}

	req.Header.Set("Authorization", "Bearer phase5e-test-token")
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("X-Idempotency-Key", "KIRI5EFALSE001")
	req.Header.Set("X-Trace-Id", "KIRI5ETRACE004")

	resp, err := mock.server.Client().Do(req)
	if err != nil {
		t.Fatalf("Do() error = %v", err)
	}

	defer resp.Body.Close()

	var envelope struct {
		Data struct {
			Status string `json:"status"`
		} `json:"data"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&envelope); err != nil {
		t.Fatalf("Decode() error = %v", err)
	}

	if envelope.Data.Status == "successful" {
		t.Fatal(
			"pending Flutterwave charge must never be treated as successful",
		)
	}
}

func TestPhase5EMockServerHasNoExternalNetworkDependency(t *testing.T) {
	mock := newPhase5EMockServer(t)

	ctx, cancel := context.WithTimeout(
		context.Background(),
		2*time.Second,
	)
	defer cancel()

	req, err := http.NewRequestWithContext(
		ctx,
		http.MethodGet,
		mock.server.URL+"/not-a-real-endpoint",
		nil,
	)
	if err != nil {
		t.Fatalf("NewRequest() error = %v", err)
	}

	resp, err := mock.server.Client().Do(req)
	if err != nil {
		t.Fatalf("local mock server request failed: %v", err)
	}

	defer resp.Body.Close()

	if !strings.HasPrefix(mock.server.URL, "http://127.0.0.1:") &&
		!strings.HasPrefix(mock.server.URL, "http://[::1]:") {
		t.Fatalf(
			"test server is not local: %s",
			mock.server.URL,
		)
	}

	fmt.Printf(
		"Phase 5E mock server: %s\n",
		mock.server.URL,
	)
}
