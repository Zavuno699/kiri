# Dev Bootstrap Tool

This tool provisions development/test accounts for UI and flow testing.

## Security Warning

**This is a dev-only tool. It MUST NOT be run in production.** The tool explicitly checks for `KIRI_ENV=development` or `KIRI_ENV=test` and will refuse to run otherwise.

## Usage

1. Copy the example environment file:
   ```bash
   cp dev-accounts.env.example dev-accounts.env
   ```

2. Edit `dev-accounts.env` with REAL credentials (never commit this file):
   ```bash
   KIRI_ENV=development
   DATABASE_URL=postgresql://user:password@localhost:5432/kirilock
   DEV_LANDLORD_EMAIL=caninvasion@gmail.com
   DEV_LANDLORD_PASSWORD=your_landlord_password
   DEV_SUPERADMIN_EMAIL=lawrenceomoit66@gmail.com
   DEV_SUPERADMIN_PASSWORD=your_superadmin_password
   ```

3. Source the environment and run the bootstrap:
   ```bash
   source dev-accounts.env
   cd backend/identity-service/cmd/dev-bootstrap
   go run main.go
   ```

## What It Does

- **Landlord account**: Creates or updates a subject with `roles=["landlord"]`, `isAdmin=false`, `isSuperAdmin=false`
- **Super Admin account**: Creates or updates a subject with `roles=["super_admin"]`, `isAdmin=false`, `isSuperAdmin=true`

The tool is **idempotent**: if an account with the email already exists, it updates the roles, admin flags, and password rather than failing or duplicating.

## First Super Admin Bootstrap

This is the **only supported way** to create the first `super_admin` account. The `SetSuperAdmin` handler requires an existing super_admin principal, creating a bootstrap gap. This tool closes that gap for development environments only.

## Password Security

- Passwords are read from environment variables only (never from committed files, flags, or interactive prompts)
- Passwords are bcrypt-hashed using the existing `SubjectService.CreateSubject` mechanism
- Passwords are never printed to logs or output
- Only emails, roles, and created/updated status are logged
