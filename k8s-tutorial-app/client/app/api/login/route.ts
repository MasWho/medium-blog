import { NextResponse } from 'next/server';
import { validateUser } from '../_utils/auth';
 
export async function POST(request: Request) {
  const {username, password} = await request.json();
  if(!username || !password) return NextResponse.json({error: 'Missing params'});
  try {
    const userValidated = await validateUser(username, password);
    if(!userValidated) return NextResponse.json({error: 'Invalid username or password'});
    return NextResponse.json({success: true});
  } catch (error) {
    return NextResponse.json({error: 'Something went wrong'});
  }
}