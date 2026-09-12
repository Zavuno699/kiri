package api

type DefaultHandler struct {
	HandlerName string
}

func NewDefaultHandler(name string) *DefaultHandler {
	return &DefaultHandler{HandlerName: name}
}

func (h *DefaultHandler) Name() string {
	if h == nil {
		return ""
	}
	return h.HandlerName
}

