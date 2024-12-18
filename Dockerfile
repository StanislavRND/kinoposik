FROM node:latest AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY .env .env
RUN npm run build

FROM node:latest
WORKDIR /app
COPY --from=builder /app /app
RUN npm install --production

EXPOSE 3000
CMD ["npm", "start"]
