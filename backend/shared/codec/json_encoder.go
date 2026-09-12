package codec

import "encoding/json"

type JSONEncoder struct{}

func NewJSONEncoder() *JSONEncoder {
	return &JSONEncoder{}
}

func (e *JSONEncoder) Encode(value any) ([]byte, error) {
	return json.Marshal(value)
}

