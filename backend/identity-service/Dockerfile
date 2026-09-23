FROM golang:1.26.4-bookworm AS builder

WORKDIR /src

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
    go build \
    -trimpath \
    -ldflags="-s -w" \
    -o /out/identity-service \
    ./identity-service/cmd/identity-service

FROM gcr.io/distroless/static-debian12:nonroot

WORKDIR /app

COPY --from=builder /out/identity-service /app/identity-service

USER nonroot:nonroot

EXPOSE 8081

ENTRYPOINT ["/app/identity-service"]
