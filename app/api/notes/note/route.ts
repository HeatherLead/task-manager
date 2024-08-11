import prisma from "@/Client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body);

    if (!body) {
      return NextResponse.json({ error: "No data found" }, { status: 400 });
    }

    const { title, description, deadline, difficulty } = body;
    const progress = "active";

    const note = await prisma.note.create({
      data: {
        title,
        description,
        deadline,
        difficulty,
        progress,
      },
    });

    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error("Error creating note:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
