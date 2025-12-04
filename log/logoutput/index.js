import express from 'express';
import path from 'path';
import fs from 'fs';

const directory = path.join('/', 'usr', 'src', 'app', 'files');
const filePath = path.join(directory, 'log.txt');
const pongPath = path.join(directory, 'pong.txt');

const app = express();

app.get('/', async (request, response) => {
  const data = await fs.promises.readFile(filePath, (e) => {
    if (e) {
      console.log('error ', e);
    }
  });
  const pongs = await fs.promises.readFile(pongPath, (e) => {
    if (e) {
      console.log('error ', e);
    }
  });
  response.send(`${data.toString()} \nPing / Pongs: ${pongs.toString()}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
