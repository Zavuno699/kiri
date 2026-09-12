package service

import "net/http"

type DeviceHTTPContentTypeMiddleware struct {
	Next http.Handler
}

func NewDeviceHTTPContentTypeMiddleware(
	next http.Handler,
) *DeviceHTTPContentTypeMiddleware {
	return &DeviceHTTPContentTypeMiddleware{
		Next: next,
	}
}

func (m *DeviceHTTPContentTypeMiddleware) ServeHTTP(
	writer http.ResponseWriter,
	request *http.Request,
) {
	if request.Method == http.MethodPost &&
		request.Body != http.NoBody {
		contentType := request.Header.Get("Content-Type")

		if contentType != "" &&
			contentType != "application/json" {
			writeDeviceHTTPError(
				writer,
				http.StatusUnsupportedMediaType,
				"unsupported_content_type",
				"application/json is required",
			)
			return
		}
	}

	m.Next.ServeHTTP(
		writer,
		request,
	)
}
