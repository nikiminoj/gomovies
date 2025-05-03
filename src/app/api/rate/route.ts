import { MUTATIONS, QUERIES } from "@/server/db/queries";
import { auth } from "@/server/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { itemId, type, rating } = await req.json();

    if (!itemId || !type || !rating || (type !== "movie" && type !== "serie") || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    await MUTATIONS.rateItem({user_id: session.user.id, item_id: itemId, type: type, rating: rating});

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}