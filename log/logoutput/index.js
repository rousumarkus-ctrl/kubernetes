import express from 'express';
import path from 'path';
import fs from 'fs';
import axios from 'axios';

const directory = path.join('/', 'usr', 'src', 'app', 'files');
const pongDirectory = path.join('/', 'usr', 'src', 'app', 'pongfiles');
const filePath = path.join(directory, 'log.txt');
const pongPath = path.join(pongDirectory, 'pong.txt');

const app = express();

app.get('/', async (request, response) => {
  const data = await fs.promises.readFile(filePath, (e) => {
    if (e) {
      console.log('error ', e);
    }
  });
  const pongs = await axios.get('http://pingpong-svc:2345/pings');
  console.log(pongs);
  /*   const pongs = await fs.promises.readFile(pongPath, (e) => {
    if (e) {
      console.log('error ', e);
    }
  }); */
  response.send(`${data.toString()} \nPing / Pongs: ${pongs.data.toString()}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
