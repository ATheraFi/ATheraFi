import prisma from "../../../../lib/prisma"

export default async function handler(req, res) {
  const { lat, lng, therapyType } = req.query;
  const radius = 25; // Radius in miles

  const latDegreePerMile = 0.0144927536; // Approximate latitude degrees per mile
  const lngDegreePerMile = 0.0181818182; // Approximate longitude degrees per mile

  const latDegreeRadius = radius * latDegreePerMile;
  const lngDegreeRadius = radius * lngDegreePerMile;

  const latMin = parseFloat(lat) - latDegreeRadius;
  const latMax = parseFloat(lat) + latDegreeRadius;
  const lngMin = parseFloat(lng) - lngDegreeRadius;
  const lngMax = parseFloat(lng) + lngDegreeRadius;

  try {
    const therapies = await prisma.therapy.findMany({
      include: {
        author: true,
        providers: true,
      },
      where: {
        therapyType: therapyType,
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

    res.status(200).json({ therapies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}
