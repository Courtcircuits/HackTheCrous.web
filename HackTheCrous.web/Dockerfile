FROM node:20-alpine AS builder
WORKDIR /app

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

ARG VITE_API_ENDPOINT=https://hack.ratathune.fr
ENV VITE_API_ENDPOINT=${VITE_API_ENDPOINT}

COPY . .

RUN npm install && npm run build

FROM nginx:1.25.3-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
