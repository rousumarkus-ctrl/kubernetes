import app from './app.js';
import fs from 'fs';
import path from 'path';
import pool from './db.js';

const directory = path.join('/', 'usr', 'src', 'app', 'images');

const createTable = async () => {
  try {
    const res = await pool.query(
      `CREATE TABLE IF NOT EXISTS todos (id SERIAL PRIMARY KEY,title TEXT NOT NULL,done boolean default FALSE);`
    );
  } catch (e) {
    console.log('Query failed', e);
    setTimeout(createTable, 5000);
  }
};
app.get('/version', async (request, response) => {
  response.send(2);
});

const PORT = process.env.BACKEND_PORT;
app.listen(PORT, async () => {
  console.log('Got to query');
  createTable();

  fs.promises.mkdir(directory, { recursive: true });
  console.log(`Server started in port ${PORT}`);
});
