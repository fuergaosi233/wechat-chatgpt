FROM node:19 AS app

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD npm run dev