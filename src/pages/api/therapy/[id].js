import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../../lib/prisma";

export default async function handle(req, res) {
  if (req.method === "GET") {
    await handleGet(req, res);
  } else if (req.method === "PUT") {
    await handlePut(req, res);
  } else if (req.method === "DELETE") {
    await handleDelete(req, res);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

async function handleGet(req, res) {
  const query = req.query;
  const { id } = query;

  try {
    const result = await prisma.therapy.findUnique({
      where: {
        id: id
      }
    })
    res.json(result);
  } catch (error) {
    console.log("Update error: ", error);
    res.status(500).json({ error: "An error occurred while getting the therapy." });
  }
}

async function handlePut(req, res) {
  const {
    companyName,
    description,
    address,
    companyEmail,
    companyWebsite,
    companyPhonenumber,
    providers,
    therapyType,
  } = req.body;

  const session = await getServerSession(req, res, authOptions(req, res));

  const query = req.query;
  const { id } = query;

  try {
    // Remove providers that are no longer in the list
    const existingProviders = await prisma.providerNetwork.findMany({
      where: { therapyId: id },
    });

    const providersToRemove = existingProviders.filter(
      (existingProvider) =>
        !providers.some((provider) => provider.id === existingProvider.id)
    );

    const providerDeletionPromises = providersToRemove.map((provider) =>
      prisma.providerNetwork.delete({
        where: { id: provider.id },
      })
    );

    await Promise.all(providerDeletionPromises);

    const result = await prisma.therapy.update({
      where: {
        id: id,
      },
      data: {
        name: companyName,
        description: description,
        address: address.address,
        city: address.city,
        state: address.state,
        zipcode: address.zipcode,
        companyEmail: companyEmail,
        companyWebsite: companyWebsite,
        companyPhone: companyPhonenumber,
        lat: address.lat,
        lng: address.lng,
        therapyType: therapyType,
        providers: {
          upsert: providers.map((provider) => ({
            where: { id: provider.id },
            update: { name: provider.name },
            create: { name: provider.name },
          })),
        },
        author: { connect: { email: session?.user?.email } },
      },
      include: {
        providers: true,
      },
    });

    res.json(result);
  } catch (error) {
    console.log("Update error: ", error);
    res.status(500).json({ error: "An error occurred while updating the therapy." });
  }
}

async function handleDelete(req, res) {
  const query = req.query;
  const { id } = query;

  try {
    await prisma.therapy.delete({
      where: {
        id: id,
      },
    });

    res.json({ message: "Therapy deleted successfully." });
  } catch (error) {
    console.log("Delete error: ", error);
    res.status(500).json({ error: "An error occurred while deleting the therapy." });
  }
}
