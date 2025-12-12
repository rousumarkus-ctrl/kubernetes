# ===== FRONTEND BUILD =====
FROM node:20 AS frontendr

WORKDIR /usr/src/app/todo-frontend

COPY todo-frontend/package*.json ./
RUN npm install

COPY todo-frontend/ ./
RUN npm run build

FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production

COPY . .

COPY --from=frontend /usr/src/app/todo-frontend/dist ./dist
CMD ["npm", "start"]