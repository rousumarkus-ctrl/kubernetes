import { Router } from 'express';

const todos = [];

const todoRouter = Router();
todoRouter.get('/', async (request, response) => {
  response.json(todos);
});

todoRouter.post('/', async (request, response) => {
  const body = request.body;
  const todo = { title: body.title };
  todos.push(todo);
  response.status(201).json(todo);
});

export default todoRouter;
