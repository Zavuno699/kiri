package service

import "os"

type ProductionRuntimeConfig struct {
	HTTPAddress string
	DeviceID    string
}

func NewProductionRuntimeConfig() ProductionRuntimeConfig {
	address := os.Getenv("DEVICE_SERVICE_HTTP_ADDRESS")
	port := os.Getenv("DEVICE_SERVICE_HTTP_PORT")

	if address == "" {
		address = "0.0.0.0"
	}

	if port == "" {
		port = "8080"
	}

	return ProductionRuntimeConfig{
		HTTPAddress: address + ":" + port,
		DeviceID:    os.Getenv("DEVICE_SERVICE_ID"),
	}
}
