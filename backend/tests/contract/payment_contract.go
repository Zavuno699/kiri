package contract

type LeasePaymentPayload struct {
	TenantPhone    string `json:"tenant_phone" validate:"required,e164"`
	AmountUGX      int64  `json:"amount_ugx" validate:"required,gte=20000"`
	DaysRequested  int    `json:"days_requested" validate:"required,gte=1,lte=365"`
	IdempotencyKey string `json:"idempotency_key" validate:"required,uuid4"`
	CurrencyCode   string `json:"currency_code" validate:"required,oneof=UGX USD"`
}
