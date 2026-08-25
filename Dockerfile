# syntax=docker/dockerfile:1

# ---- Base: install dependencies once, shared by dev & build stages ----
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci || npm install

# ---- Dev target: hot-reloading dev server (react-scripts start) ----
FROM deps AS dev
WORKDIR /app
COPY . .
ENV NODE_ENV=development
ENV WDS_SOCKET_PORT=0
EXPOSE 3000
CMD ["npm", "start"]

# ---- Build stage: produce the static production build ----
FROM deps AS build
WORKDIR /app
COPY . .
ENV NODE_ENV=production
RUN npm run build

# ---- Production target: static build served by Nginx ----
FROM nginx:1.27-alpine AS production
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]