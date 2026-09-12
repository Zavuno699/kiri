package service

import "net/http"

type DeviceHTTPMethodMiddleware struct {
	Next    http.Handler
	Methods map[string]struct{}
}

func NewDeviceHTTPMethodMiddleware(
	next http.Handler,
	methods ...string,
) *DeviceHTTPMethodMiddleware {
	allowed := make(map[string]struct{}, len(methods))

	for _, method := range methods {
		allowed[method] = struct{}{}
	}

	return &DeviceHTTPMethodMiddleware{
		Next:    next,
		Methods: allowed,
	}
}

func (m *DeviceHTTPMethodMiddleware) ServeHTTP(
	writer http.ResponseWriter,
	request *http.Request,
) {
	if _, ok := m.Methods[request.Method]; !ok {
		writer.Header().Set(
			"Allow",
			m.allowedMethods(),
		)

		writeDeviceHTTPError(
			writer,
			http.StatusMethodNotAllowed,
			"method_not_allowed",
			"method not allowed",
		)
		return
	}

	m.Next.ServeHTTP(
		writer,
		request,
	)
}

func (m *DeviceHTTPMethodMiddleware) allowedMethods() string {
	methods := make([]string, 0, len(m.Methods))

	for method := range m.Methods {
		methods = append(methods, method)
	}

	result := ""

	for index, method := range methods {
		if index > 0 {
			result += ", "
		}

		result += method
	}

	return result
}
