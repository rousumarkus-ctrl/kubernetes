import express from 'express';

const app = express();

app.get('/', async (request, response) => {
  response.send('Hello from version 2');
});

app.get('/version', async (request, response) => {
  response.send(1);
});

const PORT = process.env.GREETER_PORT;
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
