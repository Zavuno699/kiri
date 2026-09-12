
package codec

type DecoderContract interface {
	Decode([]byte, any) error
}

