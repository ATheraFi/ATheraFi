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
    let error_response = {
      status: 'fail',
      message: 'No therapies found',
    }
    return new NextResponse(JSON.stringify(error_response), { 
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new NextResponse(JSON.stringify(therapies), {
    headers: {
      'Access-Control-Allow-Origin': "*",
      'Content-Type': 'application/json'
    }
  })
}