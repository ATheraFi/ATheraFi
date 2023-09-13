import {prisma} from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request, 
  { params }: { params: { id: string } }
) {
  const id = params.id
  console.log("ID: ", id)
  const therapy = await prisma?.therapy.findUnique({
    where: { 
      id,
    }
  })

  if (!therapy) {
    let error_response = {
      status: 'fail',
      message: 'No therapy found with that ID.',
    }
    console.log("ERROR: +++++ ", JSON.stringify(error_response))
    return new NextResponse(JSON.stringify(error_response), { 
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  let json_response = {
    status: 'success',
    data: {
      therapy
    }
  }
  
  return NextResponse.json(json_response)

  // return new NextResponse(JSON.stringify(therapy), {
  //   headers: {
  //     'Access-Control-Allow-Origin': "*",
  //     'Content-Type': 'application/json'
  //   }
  // })
}