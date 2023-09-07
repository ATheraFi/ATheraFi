"use client"

import prisma from "@/lib/prisma";
import { useSearchParams } from "next/navigation";
import { NextRouter } from "next/router";
import { NextResponse } from "next/server";
import { TherapyType } from "@prisma/client";

export async function GET(request: Request) {
  const searchParams = useSearchParams()

  const city = searchParams?.get('city')
  const state = searchParams?.get('state')
  const lat: number = parseFloat(searchParams?.get('lat') as string)
  const lng: number = parseFloat(searchParams?.get('lng') as string)
  const therapyType: TherapyType | null = searchParams?.get('therapyType') as TherapyType | null

  const radius = 25; // Radius in miles

  const latDegreePerMile = 0.0144927536; // Approximate latitude degrees per mile
  const lngDegreePerMile = 0.0181818182; // Approximate longitude degrees per mile

  const latDegreeRadius = radius * latDegreePerMile;
  const lngDegreeRadius = radius * lngDegreePerMile;

  const latMin = lat - latDegreeRadius;
  const latMax = lat + latDegreeRadius;
  const lngMin = lng - lngDegreeRadius;
  const lngMax = lng + lngDegreeRadius;

  const therapies = await prisma.therapy.findMany()

  try {
    const therapies = await prisma.therapy.findMany({
      include: {
        author: true,
        providers: true,
      },
      where: {
        therapyType: therapyType || undefined,
        lat: {
          gte: latMin,
          lte: latMax,
        },
        lng: {
          gte: lngMin,
          lte: lngMax,
        },
      },
    });
    console.log("Therapies: ", therapies)

    NextResponse.json(therapies);
  } catch (error) {
    console.error(error);
    NextResponse.json({ error: 'An error occurred' });
  }
}
