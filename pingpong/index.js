import express from 'express';
import fs from 'fs';
import path from 'path';

let pings = 0;

const directory = path.join('/', 'usr', 'src', 'app', 'pongfiles');
const filePath = path.join(directory, 'pong.txt');
fs.promises.mkdir(directory, { recursive: true });

const app = express();

app.get('/pingpong', async (request, response) => {
  response.send(getPings());
  pings++;
  fs.promises.writeFile(filePath, pings.toString());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
  fs.readFile(filePath, (e, data) => {
    if (e) {
      pings = 0;
      fs.promises.writeFile(filePath, pings.toString());
    } else {
      pings = parseInt(data.toString());
    }
  });
});

const getPings = () => {
  return `pong ${pings}`;
};
