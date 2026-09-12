package service

import (
	"net/http"
	"strings"
)

type DeviceHTTPAuthMiddleware struct {
	Authenticator DeviceAuthenticator
	Next          http.Handler
}

func NewDeviceHTTPAuthMiddleware(
	authenticator DeviceAuthenticator,
	next http.Handler,
) *DeviceHTTPAuthMiddleware {
	return &DeviceHTTPAuthMiddleware{
		Authenticator: authenticator,
		Next:          next,
	}
}

func (m *DeviceHTTPAuthMiddleware) ServeHTTP(
	writer http.ResponseWriter,
	request *http.Request,
) {
	token := request.Header.Get("Authorization")
	token = strings.TrimSpace(token)

	auth, err := m.Authenticator.Authenticate(
		request.Context(),
		token,
	)

	if err != nil {
		writeDeviceHTTPError(
			writer,
			http.StatusUnauthorized,
			"unauthorized",
			err.Error(),
		)
		return
	}

	ctx := WithDeviceAuth(
		request.Context(),
		auth,
	)

	m.Next.ServeHTTP(
		writer,
		request.WithContext(ctx),
	)
}
