#!/usr/bin/env bash

# Script to run PostgreSQL in a Podman container

# Define database parameters (you might want to move these to a .env file)
# DB_USER="postgres"
# DB_PASSWORD="password"  # Change this to a secure password
# DB_NAME="postgres_db"
# DB_PORT="5432"
# DB_CONTAINER_NAME="postgres-podman"
# If using .env file, uncomment the following lines and comment out the above definitions.
set -a
source .env
set +a
DB_USER=${POSTGRES_USER:-"postgres"}
DB_PASSWORD=${POSTGRES_PASSWORD:-"password"}  # Change this to a secure password or set in .env
DB_NAME=${POSTGRES_DB:-"gomovies"}
DB_PORT=${POSTGRES_PORT:-"5432"}
DB_CONTAINER_NAME=${POSTGRES_CONTAINER_NAME:-"postgres-podman"}

# Check if Podman is installed
if ! [ -x "$(command -v podman)" ]; then
  echo -e "Podman is not installed. Please install podman and try again.\nPodman install guide: https://podman.io/getting-started/installation"
  exit 1
fi

# Check if the container is already running
if podman ps --filter "name=$DB_CONTAINER_NAME" | grep -q "$DB_CONTAINER_NAME"; then
  echo "PostgreSQL container '$DB_CONTAINER_NAME' is already running."
  exit 0
fi

# Check if the container exists but is stopped
if podman ps -a --filter "name=$DB_CONTAINER_NAME" | grep -q "$DB_CONTAINER_NAME"; then
  echo "PostgreSQL container '$DB_CONTAINER_NAME' exists but is stopped. Starting it..."
  podman start "$DB_CONTAINER_NAME"
  exit 0
fi

# Run the PostgreSQL container
echo "Running PostgreSQL in a Podman container..."
podman run -d \
  --name "$DB_CONTAINER_NAME" \
  -e POSTGRES_USER="$DB_USER" \
  -e POSTGRES_PASSWORD="$DB_PASSWORD" \
  -e POSTGRES_DB="$DB_NAME" \
  -p "$DB_PORT":5432 \
  postgres:latest

echo "PostgreSQL container '$DB_CONTAINER_NAME' started successfully."
echo "You can connect to the database using: postgresql://$DB_USER:$DB_PASSWORD@localhost:$DB_PORT/$DB_NAME"