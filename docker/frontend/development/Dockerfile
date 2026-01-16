# =============================================================================
# NEXTJS FRONTEND - DEVELOPMENT DOCKERFILE
# =============================================================================

# Use Node.js 18 Alpine for smaller image size
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

# Create node_modules and .next directories
RUN mkdir -p /app/node_modules /app/.next

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

# Start development server with hot reload
CMD ["sh", "-c", "if [ -f package.json ]; then npm install && npm run dev; else echo 'Waiting for application files...'; sleep 30; fi"] 