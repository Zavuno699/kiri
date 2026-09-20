#!/bin/bash
# KiriLock Database Migration Runner
# This script applies all SQL migrations in numeric order to the database
# Usage: ./migrate.sh [DATABASE_URL]
# If DATABASE_URL is not provided, it uses the DATABASE_URL environment variable

set -e

MIGRATIONS_DIR="$(dirname "$0")/migrations"
DATABASE_URL="${1:-$DATABASE_URL}"

if [ -z "$DATABASE_URL" ]; then
  echo "ERROR: DATABASE_URL must be provided as argument or environment variable"
  echo "Usage: ./migrate.sh 'postgresql://user:password@localhost:5432/kirilock'"
  exit 1
fi

echo "Applying migrations to database..."
echo "Migrations directory: $MIGRATIONS_DIR"

# Apply migrations in numeric order
for migration in "$MIGRATIONS_DIR"/*.sql; do
  if [ -f "$migration" ]; then
    filename=$(basename "$migration")
    echo "Applying: $filename"
    psql "$DATABASE_URL" -f "$migration"
  fi
done

echo "All migrations applied successfully"
