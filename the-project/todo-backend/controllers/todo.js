import { Router } from 'express';
import pool from '../db.js';

const todoRouter = Router();
todoRouter.get('/', async (request, response) => {
  const res = await pool.query(`SELECT * FROM TODOS;`);
  response.status(200).json(res.rows);
});

todoRouter.post('/', async (request, response) => {
  const body = request.body;
  if (body.title.length > 140) {
    console.log(`rejected too long: ${body.title}`);
    response.status(400).json({ error: 'too long' });
  } else {
    const res = await pool.query(
      `INSERT INTO todos (title) VALUES ($1) Returning *;`,
      [body.title]
    );
    console.log(`added ${res.rows[0].title}`);
    response.status(201).json(res.rows[0]);
  }
});

todoRouter.get('/healthz', async (request, response) => {
  try {
    const res = await pool.query(`SELECT * FROM TODOS;`);
    response.status(200).end();
  } catch (e) {
    response.status(400).end();
  }

  response.status(200).json(res.rows);
});

export default todoRouter;
