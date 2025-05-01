import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/server/db';
import { users } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/server/auth';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { newEmail } = body;

    if (!newEmail) {
      return NextResponse.json({ message: 'New email is required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      return NextResponse.json({ message: 'Invalid email format' }, { status: 400 });
    }

    const [user] = await db.select().from(users).where(eq(users.email, session.user.email));
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    await db.update(users).set({ email: newEmail }).where(eq(users.email, session.user.email));

    return NextResponse.json({ message: 'Email updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error changing email:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}