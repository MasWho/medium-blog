import { NextApiRequest, NextApiResponse } from "next";
import redisClient from "../../redis_client/client"; 

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  const {jobDetails} = JSON.parse(req.body);
  if(!jobDetails) {
    res.status(400).json({error: 'Missing job details'});
    return;
  }
  // generate a random id for the job
  const jobId = Math.random().toString(36).substring(7);
  await redisClient.publish('jobs', JSON.stringify({jobId, jobDetails}), () => {});
  res.status(200).json({jobId});
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'POST') {
    postHandler(req, res);
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};