import express from 'express';

const app = express();

app.get('/', async (req, res) => {
  res.send(`Hello world k8s`);
});

app.listen(8000, () => {
  console.log('Listening on port 8000');
});
