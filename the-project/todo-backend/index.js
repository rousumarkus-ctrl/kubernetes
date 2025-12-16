import app from './app.js';
import fs from 'fs';
import path from 'path';
import pool from './db.js';

const directory = path.join('/', 'usr', 'src', 'app', 'images');

const PORT = process.env.BACKEND_PORT;
app.listen(PORT, async () => {
  const res = await pool.query(
    `CREATE TABLE IF NOT EXISTS todos (id SERIAL PRIMARY KEY,title TEXT NOT NULL);`
  );
  fs.promises.mkdir(directory, { recursive: true });
  console.log(`Server started in port ${PORT}`);
});
