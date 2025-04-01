FROM node:18-alpine AS base

WORKDIR /usr/src/frontend
RUN chmod -R 777 ./

COPY package*.json ./
RUN npm ci

# Development stage
FROM base AS development
COPY . .
USER node

# Build stage
FROM base AS build
COPY --from=development /usr/src/frontend ./
RUN npm run build

# Production stage
FROM nginx:alpine AS production

WORKDIR /usr/share/nginx/html

RUN mkdir -p /var/cache/nginx/client_temp && \
    chown -R nginx:nginx /var/cache/nginx && \
    chmod -R 777 /var/cache/nginx

COPY --from=build /usr/src/frontend/dist .
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

USER root

CMD ["nginx", "-g", "daemon off;"]
