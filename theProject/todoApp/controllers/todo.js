import { Router } from 'express';
const todoRouter = Router();
todoRouter.get('/', async (request, response) => {
  response.send('hello world!');
});

export default todoRouter;
