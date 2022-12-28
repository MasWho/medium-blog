// project dependencies
import app from './app';
const { SERVER_PORT } = process.env;

// app listening 
app.listen(SERVER_PORT, () => {
  console.info(`App running on port ${SERVER_PORT}`);
});