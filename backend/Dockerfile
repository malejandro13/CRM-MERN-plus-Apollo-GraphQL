# develop stage backend
FROM node:13.0-alpine
RUN apk --no-cache add --virtual builds-deps build-base python
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["/bin/sh", "-c", "npm run start"]