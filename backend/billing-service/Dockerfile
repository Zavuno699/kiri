FROM golang:1.26.4-bookworm AS builder

WORKDIR /src

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
    go build \
    -trimpath \
    -ldflags="-s -w" \
    -o /out/billing-service \
    ./billing-service/cmd/billing-service

FROM gcr.io/distroless/static-debian12:nonroot

WORKDIR /app

COPY --from=builder /out/billing-service /app/billing-service

USER nonroot:nonroot

EXPOSE 8083

ENTRYPOINT ["/app/billing-service"]
