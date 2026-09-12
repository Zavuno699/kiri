FROM golang:1.26.4-bookworm AS builder

WORKDIR /src

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
    go build \
    -trimpath \
    -ldflags="-s -w" \
    -o /out/device-service \
    ./device-service/cmd/device-service

FROM gcr.io/distroless/static-debian12:nonroot

WORKDIR /app

COPY --from=builder /out/device-service /app/device-service

USER nonroot:nonroot

EXPOSE 8080

ENTRYPOINT ["/app/device-service"]
