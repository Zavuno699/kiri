package codec

import "encoding/json"

type JSONDecoder struct{}

func NewJSONDecoder() *JSONDecoder {
	return &JSONDecoder{}
}

func (d *JSONDecoder) Decode(data []byte, target any) error {
	return json.Unmarshal(data, target)
}

