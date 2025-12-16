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
  console.log(process.env.PIC_URL);
  const response = await axios.get(process.env.PIC_URL, {
    responseType: 'stream',
  });
  console.log(response);
  response.data.pipe(fs.createWriteStream(filePath));
};

const removeFile = async () =>
  new Promise((res) => fs.unlink(filePath, (err) => res()));

const todoRouter = Router();
/* todoRouter.get('/', async (request, response) => {
  await fileAgeCheck();
}); */

todoRouter.get('/image', async (request, response) => {
  response.sendFile(filePath);
});

todoRouter.post('/image', async (request, response) => {
  await fileAgeCheck();
  response.status(200).end();
});

export default todoRouter;
