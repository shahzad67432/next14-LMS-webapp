import { NextResponse } from "next/server";
import db from "@/db/drizzle";
import { lessons } from "@/db/schema";
import { isAdmin } from "@/lib/admin";

export const GET = async()=>{
    if(!isAdmin()){
        return new NextResponse("Unauthorized", {status: 401}) // unauthorized measn the user is authenticated but the user is not authorizeed or allowed to perfoem some tasks.
    }
    const data = await db.query.lessons.findMany();
    return NextResponse.json(data);
}

export const POST = async(req: Request)=>{
    if(!isAdmin()){
        return new NextResponse("Unauthorized", {status: 401}) // unauthorized measn the user is authenticated but the user is not authorizeed or allowed to perfoem some tasks.
    }
    const body = await req.json()
    const data = await db.insert(lessons).values({
        ...body,
    }).returning()
    return NextResponse.json(data[0]);
}