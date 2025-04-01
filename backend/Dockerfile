FROM node:18-alpine AS base

RUN apk add --no-cache openssl

WORKDIR /usr/src/backend
RUN chmod -R 777 ./

COPY package*.json ./

RUN npm ci

# Development stage
FROM base AS development
COPY . .
USER node

# Build stage
FROM base AS build
COPY . .
COPY --from=development /usr/src/backend/node_modules ./node_modules
RUN npm run build
ENV NODE_ENV=production
RUN npm ci --omit=dev && npm cache clean --force
USER node

# Production stage
FROM base AS production
WORKDIR /usr/src/backend
COPY --from=build /usr/src/backend/dist ./dist
COPY --from=build /usr/src/backend/node_modules ./node_modules
COPY --from=build /usr/src/backend/prisma ./prisma
COPY .env .env

RUN npx prisma migrate deploy

CMD ["node", "dist/main"]
