package bootstrap

type MessagingStatus struct {
	Configured bool
	ClientID   string
}

func NewMessagingStatus(cfg Config) MessagingStatus {
	return MessagingStatus{
		Configured: cfg.MessageClientID != "",
		ClientID:   cfg.MessageClientID,
	}
}
