// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]";

// import prisma from "../../../../lib/prisma";

// // POST /api/therapy
// export default async function handle(req, res) {
//   try {
//     const { companyName, description, address, companyEmail, companyWebsite, companyPhonenumber, providers, therapyType } = req.body;

//     const session = await getServerSession(req, res, authOptions(req, res));

//     const result = await prisma.therapy.create({
//       data: {
//         name: companyName,
//         description: description,
//         address: address.address,
//         city: address.city,
//         state: address.state,
//         zipcode: address.zipcode,
//         companyEmail: companyEmail,
//         companyWebsite: companyWebsite,
//         companyPhone: companyPhonenumber,
//         lat: address.lat,
//         lng: address.lng,
//         therapyType: therapyType,
//         providers: {
//           create: providers?.map((provider) => ({ name: provider.provider }))
//         },
//         author: { connect: { email: session?.user?.email } }
//       },
//       include: {
//         providers: true
//       }
//     });

//     return res.json(result);
//   } catch (error) {
//     console.error("Error creating therapy:", error);
//     return res.status(500).json({ error: "Failed to create therapy" });
//   }
// }
