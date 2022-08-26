FROM node:14.19

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# RUN npm run build

# CMD ["node", "dist/main.js"]