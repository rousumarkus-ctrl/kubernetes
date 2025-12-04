import express from 'express';
import path from 'path';
import fs from 'fs';

const directory = path.join('/', 'usr', 'src', 'app', 'files');
const filePath = path.join(directory, 'log.txt');

const app = express();

app.get('/', (request, response) => {
  fs.readFile(filePath, (e, data) => {
    if (e) {
      console.log('error ', e);
    }
    response.send(data.toString());
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
