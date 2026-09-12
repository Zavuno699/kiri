package device

func NewDefaultClient(
	config Config,
) *Client {
	transport := NewNoopTransportFactory().NewTransport(config)

	session := NewSession(
		transport,
	)

	router := NewCommandRouter(
		session,
	)

	return NewClient(
		config,
		session,
		router,
	)
}
