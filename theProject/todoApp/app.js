import express from 'express';
import todoRouter from './controllers/todo.js';

const app = express();

app.use('/', todoRouter);

export default app;
