# =============================================================================
# STRAPI BACKEND - PRODUCTION DOCKERFILE
# =============================================================================

# Build stage
FROM node:24-alpine3.23 AS builder

# Set working directory
WORKDIR /app

# Install system dependencies
RUN --mount=type=cache,target=/var/cache/apk \
    apk add --no-cache \
    python3 \
    make \
    g++ \
    git

# Copy package files
COPY apps/api/package*.json ./

# Install all dependencies
RUN --mount=type=cache,target=/root/.npm \
    npm ci

# Copy source code
COPY apps/api/ .

# Build the application
RUN npm run build

# Production stage
FROM node:24-alpine3.23 AS production

# Set working directory
WORKDIR /app

# Install system dependencies
RUN --mount=type=cache,target=/var/cache/apk \
    apk add --no-cache \
    dumb-init \
    python3 \
    make \
    g++

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S strapi -u 1001

# Copy package files
COPY apps/api/package*.json ./

# Install only production dependencies
RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Copy built application from builder stage
COPY --from=builder --chown=strapi:nodejs /app ./
WORKDIR /app

# COPY --from=builder --chown=strapi:nodejs /app/dist ./dist
# COPY --from=builder --chown=strapi:nodejs /app/public ./public
# COPY --from=builder --chown=strapi:nodejs /app/package*.json ./
# COPY --from=builder --chown=strapi:nodejs /app/favicon.png ./
# COPY --from=builder --chown=strapi:nodejs /app/tsconfig.json ./
# COPY --from=builder --chown=strapi:nodejs /app/healthcheck.js ./

# Switch to non-root user
USER strapi

# Expose port
EXPOSE 1337

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node healthcheck.js || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start production server
CMD ["npm", "start"] 