import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }){
  const id = params.id
  const therapy = await prisma?.therapy.findUnique({
    where: { 
      id,
    }
  })

  if (!therapy) {
    return new NextResponse("No therapy with ID found", { status: 404 });
  }

  return NextResponse.json(therapy)
}