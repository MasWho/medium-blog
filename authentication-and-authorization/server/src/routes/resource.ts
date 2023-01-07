import {Router} from 'express';
const resourceRoute = Router();

resourceRoute.get(
  "/",
  async (req, res) => {
    return res
      .status(200)
      .send("<h1>You have successfully access resource!</h1>");
  }
);

export default resourceRoute;