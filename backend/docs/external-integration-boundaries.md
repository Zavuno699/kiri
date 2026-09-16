# External Integration Boundaries

## Payment Providers

### Current Integration
- **Flutterwave**: Primary payment provider for Uganda market
- **Adapter Location**: `backend/billing-service/internal/adapters/flutterwave/`
- **Signature Verification**: HMAC-SHA256 webhook signature
- **Idempotency**: Provider transaction ID + idempotency key

### Interface Contract
```go
type PaymentProviderAdapter interface {
    InitiatePayment(ctx context.Context, request InitiatePaymentRequest) (InitiatePaymentResponse, error)
    VerifyPayment(ctx context.Context, transactionID string) (VerifyPaymentResponse, error)
    LookupPayment(ctx context.Context, transactionID string) (LookupPaymentResponse, error)
    ProcessWebhook(ctx context.Context, webhook WebhookPayload) (WebhookProcessingResult, error)
    SettlePayment(ctx context.Context, request SettlePaymentRequest) (SettlePaymentResponse, error)
    RefundPayment(ctx context.Context, request RefundPaymentRequest) (RefundPaymentResponse, error)
}
```

### Adding New Providers
1. Implement `PaymentProviderAdapter` interface
2. Add provider-specific signature verification
3. Implement webhook payload validation
4. Add provider transaction ID handling
5. Ensure idempotency enforcement
6. Add integration tests

### Production Requirements
- Real payment provider account
- API credentials (stored securely via SecretProvider)
- Webhook endpoint configuration
- SSL/TLS certificate for webhook delivery
- Rate limiting and retry logic

## Secret Management

### Current Implementation
- **Development**: `InMemorySecretProvider` (NOT production-safe)
- **Database**: `DatabaseSecretProvider` with AES-GCM-256 encryption
- **External Provider**: INTERFACE ONLY - requires integration

### Interface Contract
```go
type SecretProvider interface {
    StoreCredential(ctx context.Context, deviceID string, credentialType string, secret string) (string, error)
    GetCredential(ctx context.Context, reference string) (string, error)
    RevokeCredential(ctx context.Context, reference string) error
    DeleteCredential(ctx context.Context, reference string) error
}
```

### Production Options
- **AWS Secrets Manager**: AWS KMS-backed secret storage
- **HashiCorp Vault**: Enterprise secret management
- **Azure Key Vault**: Microsoft Azure integration
- **Google Secret Manager**: GCP secret storage

### Integration Requirements
- Master key management (KMS)
- Key rotation policy
- Audit logging for secret access
- IAM permissions for service accounts
- Encryption at rest and in transit

## Device Connectivity

### Current State
- Device communication via gateway devices
- Protocol placeholders exist, no real implementation
- Device lifecycle states defined but not wired to actual devices

### External Dependencies
- Device vendor API integration
- Gateway hardware provisioning
- Network connectivity management
- Device firmware OTA updates

### Integration Requirements
- Device vendor API credentials
- MQTT/HTTP protocol implementation
- Device heartbeat monitoring
- Firmware update server

## Identity Verification

### Current State
- Basic email/password authentication
- Role-based authorization
- No identity verification (KYC) integration

### External Dependencies
- Email verification service (SendGrid, AWS SES)
- Phone verification (Twilio)
- Government ID verification (Onfido, Jumio)
- Background check services

### Integration Requirements
- KYC provider account
- Identity verification API
- Document storage for verified IDs
- Compliance with local regulations

## Legal Compliance

### Jurisdiction-Specific Requirements
- **Uganda**: Uganda Registration Services Bureau (URSB) compliance
- **Other Markets**: Local business registration requirements
- **Data Protection**: GDPR, CCPA, Uganda Data Protection Act
- **Financial Services**: Central Bank licensing requirements

### External Dependencies
- Legal counsel for each jurisdiction
- Compliance monitoring service
- Data protection officer (DPO)
- Regulatory reporting tools

### Certification Requirements
- **PCI DSS**: NOT claimed - requires QSA assessment
- **KYC/AML**: NOT claimed - requires integration with verification providers
- **ISO 27001**: Optional - requires independent audit
- **SOC 2**: Optional - requires independent audit

## Monitoring and Observability

### Current State
- Basic audit logging to database
- Correlation ID tracking
- No external monitoring integration

### External Dependencies
- **APM**: Datadog, New Relic, or similar
- **Logging**: ELK Stack, CloudWatch Logs, or similar
- **Metrics**: Prometheus, CloudWatch Metrics, or similar
- **Alerting**: PagerDuty, Opsgenie, or similar

### Integration Requirements
- Monitoring service accounts
- Log aggregation infrastructure
- Metric dashboards
- Alert notification channels

## Infrastructure

### Current State
- Kubernetes deployment manifests for device-service
- Docker containerization
- No CI/CD pipeline defined

### External Dependencies
- **Kubernetes Cluster**: AWS EKS, GKE, or self-hosted
- **Container Registry**: Docker Hub, ECR, GCR, or similar
- **CI/CD**: GitHub Actions, GitLab CI, or similar
- **Database**: CockroachDB or PostgreSQL cluster
- **Message Queue**: Kafka cluster for event streaming

### Integration Requirements
- Cloud provider account (AWS, GCP, Azure)
- Database clustering configuration
- Kafka cluster setup
- SSL/TLS certificates
- DNS configuration
- CDN for static assets

## Classification

### IMPLEMENTED
- Payment provider adapter interface
- Secret provider interface
- Device lifecycle model
- Authorization scopes
- Audit logging structure
- Internationalization formatting

### INTEGRATION-READY
- Flutterwave adapter (requires provider account)
- Database secret provider (requires production encryption key)
- Audit logging (requires monitoring integration)

### EXTERNAL PROVIDER REQUIRED
- Production secret manager (AWS KMS, Vault, etc.)
- Real payment provider accounts beyond Flutterwave
- Device vendor API integration
- Identity verification providers
- KYC/AML compliance providers
- Monitoring/observability services
- CI/CD pipeline

### LEGAL-JURISDICTION REVIEW REQUIRED
- Country-specific business registration
- Data protection compliance (GDPR, CCPA, etc.)
- Financial services licensing
- Local regulatory reporting

### PRODUCTION INFRASTRUCTURE REQUIRED
- Kubernetes cluster
- Database cluster (CockroachDB/PostgreSQL)
- Kafka cluster
- SSL/TLS certificates
- DNS configuration
- CDN
- Backup and disaster recovery

### BLOCKED
- PCI DSS certification (requires QSA assessment)
- Worldwide regulatory compliance (requires jurisdiction-specific review)
- Offline financial operations (security risk)
