.PHONY: build run fmt vet verify image clean

build:
	go build ./cmd/device-service

run:
	go run ./cmd/device-service

fmt:
	gofmt -w $$(find . -name '*.go' -type f)

vet:
	cd .. && go vet ./device-service/...

verify:
	cd .. && go test ./device-service/...
	cd .. && go vet ./device-service/...

image:
	docker build -f Dockerfile -t kiri-device-service:latest ..

clean:
	rm -f device-service
