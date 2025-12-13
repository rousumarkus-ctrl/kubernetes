import { Router } from 'express';
import pool from '../db.js';

const todoRouter = Router();
todoRouter.get('/', async (request, response) => {
  const res = await pool.query(`SELECT * FROM TODOS;`);
  console.log(res);
  response.json(res);
});

todoRouter.post('/', async (request, response) => {
  const body = request.body;
  const res = await pool.query(
    `INSERT INTO todos (title) VALUES ($1) Returning *;`,
    [body.title]
  );
  console.log(res);
  response.status(201).json(res);
});

export default todoRouter;
