import { NextApiRequest, NextApiResponse } from "next";
import {createRedisInstance} from "../../redis_client/client";
const subscriber = createRedisInstance();

const EVENT_CHANNEL = 'completed_jobs';

const userEventStreams: {[userId: string]: any} = {}

const handleCompletedJobEvent = (jobId: string, result: any) => {
  console.log(`[Client] Received job ${jobId}`);
  console.log(`[Client] Job ${jobId} completed in ${result.time} seconds by ${result.id} for user ${result.userId}`);
  console.log(`${result.userId}:${result.sessionToken}`)
  userEventStreams[`${result.userId}:${result.sessionToken}`](JSON.stringify(result));
}

const subscribeToCompletedJobEvents = () => {
  subscriber.subscribe('completed_jobs', (error, count) => {
    if (error) {
      console.error('[Client] Error subscribing to job channel', error);
    } else {
      console.log(`[Client] Subscribed to ${count} channel. Listening for jobs...`);
    }
  });

  subscriber.on('message', async (channel, message) => {
    if(channel === EVENT_CHANNEL) {
      const {jobId, result} = JSON.parse(message);
      handleCompletedJobEvent(jobId, result);
    }
  });
}

const setEventHeaders = (res: NextApiResponse) => {
  res.setHeader('Content-Type', 'text/event-stream;charsetH=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('X-Accel-Buffering', 'no');
  res.setHeader('Connection', 'keep-alive');
};

const emitEvent = (args: {res: NextApiResponse, id: string, data: any}) => {
  const {res, id, data} = args;
  res.write('id: ' + id + '\n');
  res.write("data: " + data + '\n\n');
  res.write("retry: 10000\n\n");
}
 
async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  setEventHeaders(res);
  const {user, sessionToken} = req.query as {user: string, sessionToken: string};
  const id = (new Date()).toLocaleTimeString();
  const userEventEmitter = (data: any) => {
    emitEvent({res, id, data});
  };

  console.log(`${user}:${sessionToken}`);
  userEventStreams[`${user}:${sessionToken}`] = userEventEmitter;

  // Shouldn't end connection unless client closes connection.
  req.on('close', () => {
    delete userEventStreams[`${user}:${sessionToken}`];
    res.end();
  });
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET') {
    getHandler(req, res);
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};

subscribeToCompletedJobEvents();