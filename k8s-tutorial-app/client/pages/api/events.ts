import { NextApiRequest, NextApiResponse } from "next";

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
  const id = (new Date()).toLocaleTimeString();
  // Do some long running task here.
  for(let i = 0; i < 3; i++) {
    await emitEvent({res, id, data: `data: ${i}`});
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  // Shouldn't end connection unless client closes connection.
  req.on('close', () => {
    res.end();
  });
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET') {
    getHandler(req, res);
  }
}