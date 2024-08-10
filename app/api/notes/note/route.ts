import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const body = await req.json();
    if(!body){
        return NextResponse.json("no data found");
    }
}