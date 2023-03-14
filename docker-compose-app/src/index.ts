import express from 'express';
import {createClient} from 'redis';

const app = express();
const client = createClient({
  socket: {
    host: 'redis-server',  // NOTE: 'redis-server' is hostname setup by docker compose
    port: 6379,
  }
});

client.connect();

app.get('/', async (req, res) => {
  const result = await client.get('visits');
  let visits = 0;
  if(result) visits = parseInt(result);
  res.send(`Number of visits is ${visits}`);
  await client.set('visits', visits + 1);
});

app.listen(8000, () => {
  console.log('Listening on port 8000');
});
