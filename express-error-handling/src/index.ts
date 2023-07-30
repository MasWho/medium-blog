import app from "./app";

const initServer = async () => {
  app.listen(8000, () => {
    console.log(`Listening on port ${8000}`);
  });
}

initServer();