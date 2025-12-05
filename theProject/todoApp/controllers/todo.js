import { Router } from 'express';

import fs from 'fs';
import axios from 'axios';
import path from 'path';

const directory = path.join('/', 'usr', 'src', 'app', 'images');
const filePath = path.join(directory, 'image.jpg');

const fileAgeCheck = async () => {
  const stats = await fs.promises.stat(filePath).catch((e) => undefined);

  if (stats === undefined) {
    await downloadFile();
  } else {
    const current = new Date();
    if (current.getTime() - stats.mtime.getTime() > 1 * 60 * 1000) {
      await removeFile();
      await downloadFile();
    }
  }
};

const downloadFile = async () => {
  const response = await axios.get('https://picsum.photos/1200', {
    responseType: 'stream',
  });
  response.data.pipe(fs.createWriteStream(filePath));
};

const removeFile = async () =>
  new Promise((res) => fs.unlink(filePath, (err) => res()));

const todoRouter = Router();
todoRouter.get('/', async (request, response) => {
  await fileAgeCheck();
  response.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <style>
        img { width: 400px; height: 400px; }
      </style>
    </head>
    <body>
      <h1>The Project App</h1>
      <img src="/image" alt="Project Image">
      <form>
        <input type="text" maxlength="140">
        <button>Create todo</button>
        <ul>
          <li>Learn JavaScript</li>
          <li>Learn React</li>
          <li>Build a project</li>
        </ul>
      </form>
      <p>DevOps with Kubernetes 2025</p>
    </body>
    </html>
    `);
});

todoRouter.get('/image', async (request, response) => {
  response.sendFile(filePath);
});

export default todoRouter;
