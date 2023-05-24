import { NextResponse } from 'next/server';
import { createUser, getUser } from '../_utils/auth';
 
export async function POST(request: Request) {
  const {username, password} = await request.json();
  if(!username || !password) return NextResponse.json({error: 'Missing params'});

  try {
    const user = await getUser(username);
    if(!!user) return NextResponse.json({error: 'User already exists'});
    
    await createUser(username, password);
    return NextResponse.json({success: true});
  } catch (error) {
    return NextResponse.json({error: 'Something went wrong'});
  }
}
