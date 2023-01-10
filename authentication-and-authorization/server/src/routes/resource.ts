// server/src/routes/resource.ts

import {Router} from 'express';
const resourceRoute = Router();

resourceRoute.get(
  "/",
  async (req, res) => {
    return res
      .status(200)
      .json({data: "You have successfully accessed resource!" });
  }
);

export default resourceRoute;