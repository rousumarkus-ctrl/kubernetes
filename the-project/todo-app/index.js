import app from './app.js';
import fs from 'fs';
import path from 'path';

const directory = path.join('/', 'usr', 'src', 'app', 'images');

const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
  fs.promises.mkdir(directory, { recursive: true });
  console.log(`Server started in port ${PORT}`);
});
