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

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body) {
      return NextResponse.json({ error: "No data found" }, { status: 400 });
    }
    const { id } = body;

    const response = await prisma.note.delete({
      where: {id}
    })
    return NextResponse.json({ message: "Note deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error handling delete request:", error);
    return NextResponse.json({ error: "Failed to delete note" }, { status: 500 });
  }
}

const filterNullValues = (obj: any) => {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
};

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body) {
      return NextResponse.json({ error: "No data found" }, { status: 400 });
    }

    const { data, id } = body;
    const { title, description, deadline, difficulty, progress } = data;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const updateData = filterNullValues({
      title,
      description,
      deadline: deadline ? new Date(deadline) : undefined, 
      difficulty,
      progress,
    });
 

    if (Object.keys(updateData).length === 0) {
      console.log("no fields")
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    const note = await prisma.note.update({
      where: { id },
      data: updateData,
    });

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(note, { status: 200 });
  } catch (error) {

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}