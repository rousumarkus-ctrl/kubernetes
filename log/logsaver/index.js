//import express from 'express';
import path from 'path';
import fs from 'fs';

/* const app = express();

app.get('/', async (request, response) => {
  response.send(getHash());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
 */

const getHash = () => {
  const date = new Date();
  return `${date.toJSON()} ${randomHash}`;
};

const printHash = () => {
  const hash = getHash();
  console.log(hash);
  fs.promises.writeFile(filePath, hash);
  setTimeout(printHash, 5000);
};

const directory = path.join('/', 'usr', 'src', 'app', 'files');
const filePath = path.join(directory, 'log.txt');
const randomHash = Math.random().toString(36).substr(2, 6);
fs.promises.mkdir(directory, { recursive: true }).then(() => printHash());
