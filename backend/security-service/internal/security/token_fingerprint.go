package security

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
)

func TokenFingerprint(
	secret []byte,
	token []byte,
) string {
	mac := hmac.New(
		sha256.New,
		secret,
	)

	_, _ = mac.Write(token)

	return hex.EncodeToString(mac.Sum(nil))
}

func TokenFingerprintEqual(
	expected string,
	actual string,
) bool {
	return hmac.Equal(
		[]byte(expected),
		[]byte(actual),
	)
}
