import express from 'express';
import fs from 'fs';
import path from 'path';
import { Client, Pool } from 'pg';

let pings = 0;

const directory = path.join('/', 'usr', 'src', 'app', 'pongfiles');
const filePath = path.join(directory, 'pong.txt');
fs.promises.mkdir(directory, { recursive: true });
const pool = new Pool();

const app = express();

app.get('/pingpong', async (request, response) => {
  response.send(getPings());
  pings++;
  pool.query(
    `INSERT INTO ping (id,pings) VALUES (1,0) ON CONFLICT (id) DO UPDATE SET pings = ping.pings + 1;`
  );
  fs.promises.writeFile(filePath, pings.toString());
});

app.get('/pings', async (request, response) => {
  response.send(pings);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server started in port ${PORT}`);
  const res = await pool.query(
    `CREATE TABLE IF NOT EXISTS ping (id SERIAL PRIMARY KEY,pings INT);`
  );
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
