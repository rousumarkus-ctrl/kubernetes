import express from 'express';
import path from 'path';
import fs from 'fs';
import axios from 'axios';

const directory = path.join('/', 'usr', 'src', 'app', 'files');
const pongDirectory = path.join('/', 'usr', 'src', 'app', 'pongfiles');
const configDirectory = path.join('/', 'config');
const filePath = path.join(directory, 'log.txt');
const pongPath = path.join(pongDirectory, 'pong.txt');
const informationPath = path.join(configDirectory, 'information.txt');

const app = express();

app.get('/', async (request, response) => {
  const data = await fs.promises.readFile(filePath, (e) => {
    if (e) {
      console.log('error ', e);
    }
  });
  const pongs = await axios.get(process.env.PONG_URL);
  const greeting = await axios.get(process.env.GREETER_URL);
  /*   const pongs = await fs.promises.readFile(pongPath, (e) => {
    if (e) {
      console.log('error ', e);
    }
  }); */
  const information = await fs.promises.readFile(informationPath, (e) => {
    if (e) {
      console.log('error ', e);
    }
  });
  response
    .status(200)
    .send(
      `file content: ${information}\nenv variable: MESSAGE=${
        process.env.MESSAGE
      }\n${data.toString()}\nPing / Pongs: ${pongs.data.toString()}\ngreetings: ${greeting.data.toString()}`
    );
});

app.get('/healthz', async (request, response) => {
  try {
    const pongs = await axios.get(process.env.PONG_URL);
    response.status(200).end();
  } catch (e) {
    response.status(500).end();
  }
});

app.get('/version', async (request, response) => {
  response.send(1);
});

const PORT = process.env.LOG_PORT;
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
