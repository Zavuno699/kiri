package flutterwave

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
)

// VerifySignature verifies an HMAC-SHA256 webhook signature.
//
// The raw webhook body must be used. Do not marshal a decoded JSON object
// back into JSON before verification.
func VerifySignature(
	rawBody []byte,
	signature string,
	secret string,
) bool {
	if len(rawBody) == 0 || signature == "" || secret == "" {
		return false
	}

	mac := hmac.New(sha256.New, []byte(secret))

	if _, err := mac.Write(rawBody); err != nil {
		return false
	}

	expected := base64.StdEncoding.EncodeToString(mac.Sum(nil))

	return hmac.Equal(
		[]byte(expected),
		[]byte(signature),
	)
}

// ExtractSignature extracts the Flutterwave signature from headers
func ExtractSignature(headers map[string]string) string {
	// Flutterwave sends signature in X-Flutterwave-Signature header
	if sig, exists := headers["X-Flutterwave-Signature"]; exists {
		return sig
	}
	return ""
}
