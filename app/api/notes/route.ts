import prisma from "@/Client";
import { NextRequest , NextResponse } from "next/server";

export async function GET(req:NextRequest){

    try {
        const notes = await prisma.note.findMany()
        if(!notes){
            return NextResponse.json("No notes found",{status:500})
        }
        return NextResponse.json(notes, {status:200})
    } catch (error) {
        return NextResponse.json("An error occured",{status:505})
    }
}