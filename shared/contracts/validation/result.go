package validation

type Result struct {
	Valid  bool
	Errors []FieldError
}
