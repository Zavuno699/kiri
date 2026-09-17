package client

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

type DeviceCommandRequest struct {
	DeviceID string `json:"device_id"`
	Command  string `json:"command"`
	Payload  []byte `json:"payload"`
}

type DeviceCommandResponse struct {
	DeviceID string `json:"device_id"`
	Command  string `json:"command"`
	Status   string `json:"status"`
	Payload  []byte `json:"payload"`
}

type DeviceClient struct {
	baseURL    string
	httpClient *http.Client
}

func NewDeviceClient(baseURL string) *DeviceClient {
	return &DeviceClient{
		baseURL: baseURL,
		httpClient: &http.Client{
			Timeout: 30 * time.Second,
		},
	}
}

func (c *DeviceClient) SendCommand(ctx context.Context, req DeviceCommandRequest) (DeviceCommandResponse, error) {
	url := fmt.Sprintf("%s/api/v1/command", c.baseURL)

	body, err := json.Marshal(req)
	if err != nil {
		return DeviceCommandResponse{}, fmt.Errorf("failed to marshal request: %w", err)
	}

	httpReq, err := http.NewRequestWithContext(ctx, http.MethodPost, url, bytes.NewReader(body))
	if err != nil {
		return DeviceCommandResponse{}, fmt.Errorf("failed to create request: %w", err)
	}

	httpReq.Header.Set("Content-Type", "application/json")

	resp, err := c.httpClient.Do(httpReq)
	if err != nil {
		return DeviceCommandResponse{}, fmt.Errorf("failed to call device-service: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return DeviceCommandResponse{}, fmt.Errorf("device-service returned status %d", resp.StatusCode)
	}

	var deviceResp DeviceCommandResponse
	if err := json.NewDecoder(resp.Body).Decode(&deviceResp); err != nil {
		return DeviceCommandResponse{}, fmt.Errorf("failed to decode response: %w", err)
	}

	return deviceResp, nil
}
