package notification

import (
	"context"
	"time"

	"github.com/google/uuid"
)

// NotificationType represents the type of notification
type NotificationType string

const (
	NotificationTypeInvitation      NotificationType = "invitation"
	NotificationTypeInvitationResend NotificationType = "invitation_resend"
	NotificationTypeTenancyActivated NotificationType = "tenancy_activated"
	NotificationTypeTenancyTerminated NotificationType = "tenancy_terminated"
)

// NotificationChannel represents the delivery channel
type NotificationChannel string

const (
	ChannelEmail NotificationChannel = "email"
	ChannelSMS  NotificationChannel = "sms"
)

// DeliveryStatus represents the delivery status
type DeliveryStatus string

const (
	DeliveryStatusPending   DeliveryStatus = "pending"
	DeliveryStatusDelivered DeliveryStatus = "delivered"
	DeliveryStatusFailed    DeliveryStatus = "failed"
	DeliveryStatusUnavailable DeliveryStatus = "unavailable"
)

// NotificationRequest represents a notification delivery request
type NotificationRequest struct {
	ID           uuid.UUID
	Type         NotificationType
	Channels     []NotificationChannel
	Recipient    string // email or phone number
	Subject      string
	Body         string
	TenantID     *uuid.UUID
	TenancyID    *uuid.UUID
	PropertyID   *uuid.UUID
	UnitID       *uuid.UUID
	CorrelationID string
}

// NotificationResult represents the result of a notification delivery attempt
type NotificationResult struct {
	NotificationID uuid.UUID
	Status         DeliveryStatus
	Channel        NotificationChannel
	Error          string
	DeliveredAt    *time.Time
	RetryAfter     *time.Time
}

// Provider represents a notification provider (email, SMS, etc.)
type Provider interface {
	Send(ctx context.Context, req NotificationRequest) ([]NotificationResult, error)
	Name() string
	IsAvailable() bool
}

// NoOpProvider is a placeholder provider that marks notifications as unavailable
type NoOpProvider struct{}

func (p *NoOpProvider) Send(ctx context.Context, req NotificationRequest) ([]NotificationResult, error) {
	results := make([]NotificationResult, len(req.Channels))
	for i, channel := range req.Channels {
		results[i] = NotificationResult{
			NotificationID: req.ID,
			Status:         DeliveryStatusUnavailable,
			Channel:        channel,
			Error:          "no notification provider configured",
		}
	}
	return results, nil
}

func (p *NoOpProvider) Name() string {
	return "noop"
}

func (p *NoOpProvider) IsAvailable() bool {
	return false
}

// NotificationService manages notification delivery across providers
type NotificationService struct {
	providers map[NotificationChannel]Provider
}

func NewNotificationService() *NotificationService {
	return &NotificationService{
		providers: make(map[NotificationChannel]Provider),
	}
}

// RegisterProvider registers a notification provider for a channel
func (s *NotificationService) RegisterProvider(channel NotificationChannel, provider Provider) {
	s.providers[channel] = provider
}

// Send sends a notification through available channels
// Returns results for each channel attempted
func (s *NotificationService) Send(ctx context.Context, req NotificationRequest) ([]NotificationResult, error) {
	var results []NotificationResult
	
	for _, channel := range req.Channels {
		provider, ok := s.providers[channel]
		if !ok || !provider.IsAvailable() {
			// Mark as unavailable if no provider configured
			results = append(results, NotificationResult{
				NotificationID: req.ID,
				Status:         DeliveryStatusUnavailable,
				Channel:        channel,
				Error:          "no provider configured for channel",
			})
			continue
		}
		
		// Create channel-specific request
		channelReq := req
		channelReq.Channels = []NotificationChannel{channel}
		
		channelResults, err := provider.Send(ctx, channelReq)
		if err != nil {
			results = append(results, NotificationResult{
				NotificationID: req.ID,
				Status:         DeliveryStatusFailed,
				Channel:        channel,
				Error:          err.Error(),
			})
			continue
		}
		
		results = append(results, channelResults...)
	}
	
	return results, nil
}

// SendInvitation sends a tenant invitation notification
func (s *NotificationService) SendInvitation(ctx context.Context, tenantEmail string, token string, propertyName string, unitNumber string) ([]NotificationResult, error) {
	req := NotificationRequest{
		ID:        uuid.New(),
		Type:      NotificationTypeInvitation,
		Channels:  []NotificationChannel{ChannelEmail},
		Recipient: tenantEmail,
		Subject:   "You have been invited to join KiriLock",
		Body:      "You have been invited to join " + propertyName + " - Unit " + unitNumber + ". Use token: " + token + " to activate your account.",
	}
	
	return s.Send(ctx, req)
}

// SendInvitationResend sends a resent invitation notification
func (s *NotificationService) SendInvitationResend(ctx context.Context, tenantEmail string, token string) ([]NotificationResult, error) {
	req := NotificationRequest{
		ID:        uuid.New(),
		Type:      NotificationTypeInvitationResend,
		Channels:  []NotificationChannel{ChannelEmail},
		Recipient: tenantEmail,
		Subject:   "Your KiriLock invitation has been resent",
		Body:      "Your invitation has been resent. Use token: " + token + " to activate your account.",
	}
	
	return s.Send(ctx, req)
}
