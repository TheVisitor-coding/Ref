# =============================================================================
# STRAPI BACKEND - DEVELOPMENT DOCKERFILE
# =============================================================================

# Use Node.js 20 Alpine for smaller image size
FROM node:lts-alpine3.23@sha256:931d7d57f8c1fd0e2179dbff7cc7da4c9dd100998bc2b32afc85142d8efbc213 AS base

# Set working directory
WORKDIR /app

# Install system dependencies
RUN --mount=type=cache,target=/var/cache/apk \
    apk add --no-cache \
    python3 \
    make \
    g++ \
    git

# Development stage
FROM base AS development

# Create node_modules directory
RUN mkdir -p /app/node_modules

# Expose port
EXPOSE 1337

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node healthcheck.js || exit 1

# Start development server with hot reload
CMD ["sh", "-c", "if [ -f package.json ]; then npm install && npm run develop; else echo 'Waiting for application files...'; sleep 30; fi"] 