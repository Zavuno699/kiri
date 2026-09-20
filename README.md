# KiriLock Backend

KiriLock backend services.

## Architecture principles

- Strong compile-time typing
- Strict request validation
- Explicit normalization
- Explicit authorization
- Explicit domain/business validation
- Versioned API contracts
- Versioned event contracts
- Structured metadata
- Structured errors
- Idempotent financial operations
- Transactional persistence
- Observable services
- Backward-compatible evolution

## Service boundaries

- identity-service
- billing-service
- lease-service
- lock-service
- security-service
- hardware-controller

## Shared packages

The `shared/` directory contains infrastructure and contracts shared
between services.

Business/domain logic should remain inside the owning service.

## Local Development

### Database Setup

For local development, a PostgreSQL instance is required. Use the provided Docker Compose configuration:

```bash
# Start PostgreSQL container
docker-compose -f docker-compose.dev.yml up -d

# Verify database is ready
docker-compose -f docker-compose.dev.yml ps postgres

# Stop database when done
docker-compose -f docker-compose.dev.yml down
```

The database will be available at `postgresql://kirilock:kirilock_dev_password@localhost:5432/kirilock`.

### Environment Configuration

Copy `.env.example` to `.env` and configure the required variables:

```bash
cp .env.example .env
```

Required variables for local development:
- `DATABASE_URL` - PostgreSQL connection string
- `KIRI_ENV` - Set to `development` for local development
- `DEV_LANDLORD_EMAIL` / `DEV_LANDLORD_PASSWORD` - Development landlord account
- `DEV_SUPERADMIN_EMAIL` / `DEV_SUPERADMIN_PASSWORD` - Development super admin account

### Database Migrations

Apply database migrations using the Go migration runner:

```bash
cd backend/database
go run migrate.go
```

The migration runner is idempotent - it tracks applied migrations in a `schema_migrations` table and skips already-applied files.

### Development Bootstrap

Provision development accounts using the bootstrap tool:

```bash
cd backend/identity-service/cmd/dev-bootstrap
go run main.go
```

This requires `KIRI_ENV=development` and the development account credentials to be set in the environment.

### Running Services

```bash
# Identity service (port 8081)
cd backend/identity-service/cmd/identity-service
go run main.go

# Security service (port 8080)
cd backend/security-service/cmd/security-service
go run main.go
```

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```
