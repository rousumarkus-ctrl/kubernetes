FROM node:20-alpine

WORKDIR /usr/src/app

COPY package* ./

RUN npm ci

WORKDIR /usr/src/app/todo-frontend
COPY todo-frontend/package* ./
RUN npm ci && npm run build

WORKDIR /usr/src/app
COPY . .

CMD ["npm", "start"]