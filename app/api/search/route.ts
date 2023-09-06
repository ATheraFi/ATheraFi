import prisma from "@/lib/prisma";
import { NextRouter } from "next/router";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const therapies = await prisma.therapy.findMany()

  return NextResponse.json(therapies)
}
