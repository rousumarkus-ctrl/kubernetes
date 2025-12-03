import express from 'express';

const app = express();

app.get('/', async (request, response) => {
  response.send(getPings());
  pings++;
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});

let pings = 0;

const getPings = () => {
  return `pong ${pings}`;
};
