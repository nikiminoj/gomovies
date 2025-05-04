import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { contacts } from "@/server/db/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    await db.insert(contacts).values({ name, email, message });

    return NextResponse.json({ message: "Contact details saved" }, { status: 200 });
  } catch (error) {
    console.error("Error saving contact details:", error);
    return NextResponse.json({ error: "Failed to save contact details" }, { status: 500 });
  }
}