import { validateUser } from '../../db/auth';
import { NextApiRequest, NextApiResponse } from 'next';

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {username, password} = JSON.parse(req.body);
  if(!username || !password) {
    res.status(400).json({error: 'Missing params'});
    return;
  }
  try {
    const user = await validateUser(username, password);
    if(!user) {
      res.status(403).json({error: 'Invalid username or password'});
      return; 
    }
    res.status(200).json({success: true, userId: user.get('id')});
  } catch (error) {
    res.status(500).json({error: 'Something went wrong'});
  }
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