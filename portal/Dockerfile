# Multi-stage build for the portal workspace. Build context is the repo root:
#   docker build -f portal/Dockerfile .
# Training repo only: this image contains intentionally vulnerable dependencies. Never deploy it.

FROM node:22.12-alpine AS deps
WORKDIR /repo
RUN corepack enable
COPY package.json yarn.lock .yarnrc.yml ./
COPY portal/package.json portal/
RUN yarn install --immutable

FROM node:22.12-alpine AS build
WORKDIR /repo
RUN corepack enable
COPY --from=deps /repo/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN yarn workspace portal build

FROM node:22.12-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000
RUN addgroup -S app && adduser -S app -G app
COPY --from=build --chown=app:app /repo/portal/.next/standalone ./
COPY --from=build --chown=app:app /repo/portal/.next/static ./portal/.next/static
USER app
EXPOSE 3000
CMD ["node", "portal/server.js"]
