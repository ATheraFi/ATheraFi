import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request){
  const therapies = await prisma?.therapy.findMany({
    include: {
      author: true,
      providers: true
    }
  })

  if (!therapies) {
    return new NextResponse("No therapy with ID found", { status: 404 });
  }

  return new NextResponse(JSON.stringify(therapies), {
    headers: {
      'Access-Control-Allow-Origin': "*",
      'Content-Type': 'application/json'
    }
  })
}