import { getUser } from '../../db/auth';
import { NextApiRequest, NextApiResponse } from 'next';

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {username, password} = JSON.parse(req.body);
  if(!username || !password) {
    res.status(400).json({error: 'Missing params'});
    return;
  }
  try {
    const user = await getUser(username);
    if(!!user) {
      res.status(403).json({error: 'User already exists'});
      return;
    }
    res.status(200).json({success: true});
  } catch (error) {
    res.status(500).json({error: 'Something went wrong'});
  }
}
 
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'POST') {
    postHandler(req, res);
  }
}
