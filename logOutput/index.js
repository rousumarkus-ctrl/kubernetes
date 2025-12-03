import express from 'express';

const app = express();

app.get('/', async (request, response) => {
  response.send(getHash());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});

const randomHash = Math.random().toString(36).substr(2, 6);

const getHash = () => {
  const date = new Date();
  return `${date.toJSON()} ${randomHash}`;
};

const printHash = () => {
  console.log(getHash());
  setTimeout(printHash, 5000);
};
printHash();
