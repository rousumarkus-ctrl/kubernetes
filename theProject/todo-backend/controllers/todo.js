import { Router } from 'express';
import pool from '../db.js';

const todoRouter = Router();
todoRouter.get('/', async (request, response) => {
  const res = await pool.query(`SELECT * FROM TODOS;`);
  console.log(res.rows);
  response.json(res.rows);
});

todoRouter.post('/', async (request, response) => {
  const body = request.body;
  const res = await pool.query(
    `INSERT INTO todos (title) VALUES ($1) Returning *;`,
    [body.title]
  );
  console.log(res.rows[0]);
  response.status(201).json(res.rows[0]);
});

export default todoRouter;
