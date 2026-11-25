# Multi-stage Dockerfile for selimsolutions monorepo
FROM node:24-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

FROM base AS builder
WORKDIR /app
COPY package*.json ./
COPY turbo.json tsconfig.json biome.json bts.jsonc ./
COPY packages ./packages
COPY apps ./apps

# Install all workspace dependencies
RUN npm install

# Build all packages and applications via Turbo
ENV NODE_ENV=production
RUN npm run build

# Runner stage for Express backend API server
FROM node:24-alpine AS server
WORKDIR /app/apps/server
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=builder /app/package*.json /app/
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/packages /app/packages
COPY --from=builder /app/apps/server /app/apps/server
EXPOSE 3000
CMD ["node", "dist/index.mjs"]

# Runner stage for web frontend using Nginx
FROM nginx:alpine AS web
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
