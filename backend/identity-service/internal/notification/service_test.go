package notification

import (
	"context"
	"testing"

	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestNoOpProvider(t *testing.T) {
	provider := &NoOpProvider{}

	t.Run("IsAvailable returns false", func(t *testing.T) {
		assert.False(t, provider.IsAvailable(), "NoOpProvider should not be available")
	})

	t.Run("Send returns unavailable status", func(t *testing.T) {
		req := NotificationRequest{
			ID:        uuid.New(),
			Type:      NotificationTypeInvitation,
			Channels:  []NotificationChannel{ChannelEmail},
			Recipient: "test@example.com",
			Subject:   "Test",
			Body:      "Test body",
		}

		results, err := provider.Send(context.Background(), req)
		require.NoError(t, err)
		require.Len(t, results, 1, "should return one result for one channel")

		result := results[0]
		assert.Equal(t, DeliveryStatusUnavailable, result.Status, "status should be unavailable")
		assert.Equal(t, ChannelEmail, result.Channel, "channel should match")
		assert.Contains(t, result.Error, "no notification provider configured", "error should indicate no provider")
	})

	t.Run("Name returns noop", func(t *testing.T) {
		assert.Equal(t, "noop", provider.Name(), "name should be noop")
	})
}

func TestNotificationService_NoOpProvider(t *testing.T) {
	service := NewNotificationService()

	t.Run("with no provider registered", func(t *testing.T) {
		req := NotificationRequest{
			ID:        uuid.New(),
			Type:      NotificationTypeInvitation,
			Channels:  []NotificationChannel{ChannelEmail},
			Recipient: "test@example.com",
			Subject:   "Test",
			Body:      "Test body",
		}

		results, err := service.Send(context.Background(), req)
		require.NoError(t, err)
		require.Len(t, results, 1, "should return one result")

		result := results[0]
		assert.Equal(t, DeliveryStatusUnavailable, result.Status, "status should be unavailable when no provider configured")
		assert.Equal(t, ChannelEmail, result.Channel, "channel should match")
		assert.Contains(t, result.Error, "no provider configured", "error should indicate no provider")
	})

	t.Run("delivery status is truthful - never reports delivered", func(t *testing.T) {
		// Even with NoOpProvider, never report delivered
		req := NotificationRequest{
			ID:        uuid.New(),
			Type:      NotificationTypeInvitation,
			Channels:  []NotificationChannel{ChannelEmail},
			Recipient: "test@example.com",
			Subject:   "Test",
			Body:      "Test body",
		}

		results, err := service.Send(context.Background(), req)
		require.NoError(t, err)

		for _, result := range results {
			assert.NotEqual(t, DeliveryStatusDelivered, result.Status, "never report delivered with NoOpProvider")
		}
	})
}

func TestNotificationService_SendInvitation(t *testing.T) {
	service := NewNotificationService()

	t.Run("with NoOpProvider returns unavailable", func(t *testing.T) {
		results, err := service.SendInvitation(context.Background(), "test@example.com", "token123", "Test Property", "A-101")
		require.NoError(t, err)
		require.Len(t, results, 1)

		result := results[0]
		assert.Equal(t, DeliveryStatusUnavailable, result.Status, "should be unavailable with NoOpProvider")
	})
}

func TestNotificationService_SendInvitationResend(t *testing.T) {
	service := NewNotificationService()

	t.Run("with NoOpProvider returns unavailable", func(t *testing.T) {
		results, err := service.SendInvitationResend(context.Background(), "test@example.com", "token456")
		require.NoError(t, err)
		require.Len(t, results, 1)

		result := results[0]
		assert.Equal(t, DeliveryStatusUnavailable, result.Status, "should be unavailable with NoOpProvider")
	})
}
