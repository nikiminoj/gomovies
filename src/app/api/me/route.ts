import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const user = await db.query.users.findFirst({
    where: eq(users.email, session.user.email),
    columns: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
      image: true,
    },
  });

  if (!user) {
    return new NextResponse("Not Found", { status: 404 });
  }

  return NextResponse.json(user, { status: 200 });
}