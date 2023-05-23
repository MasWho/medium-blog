import { NextResponse } from 'next/server';
import { createUser } from '../_utils/auth';
 
export async function POST(request: Request) {
  const {username, password} = await request.json();
  if(!username || !password) return NextResponse.json({error: 'Missing params'});

  try {
    await createUser(username, password);
    return NextResponse.json({success: true});
  } catch (error) {
    return NextResponse.json({error: 'Something went wrong'});
  }
}
