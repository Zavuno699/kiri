package messaging

type Config struct {
	Brokers  []string
	ClientID string
}

func NewConfig(
	brokers []string,
	clientID string,
) Config {
	return Config{
		Brokers:  append([]string(nil), brokers...),
		ClientID: clientID,
	}
}
