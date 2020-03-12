# develop stage frontend
FROM node:13.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["/bin/sh", "-c", "npm start"]