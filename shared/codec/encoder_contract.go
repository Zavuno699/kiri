
package codec

type EncoderContract interface {
	Encode(any) ([]byte, error)
}

