import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { firstName, lastName } = await req.json();

    if (!firstName || !lastName) {
      return NextResponse.json(
        { message: "First name and last name are required" },
        { status: 400 },
      );
    }

    if (
      typeof firstName !== "string" ||
      firstName.trim() === "" ||
      typeof lastName !== "string" ||
      lastName.trim() === ""
    ) {
      return NextResponse.json(
        { message: "First name and last name must be non-empty strings" },
        { status: 400 },
      );
    }

    await db
      .update(users)
      .set({ firstname: firstName, lastname: lastName })
      .where(eq(users.email, session.user.email));

    return NextResponse.json(
      { message: "User name updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating user name:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}