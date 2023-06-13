import { hash } from "bcryptjs"
import prisma from "../../../../lib/prisma"


export default async function handler(req, res) {
  const { id, email_addresses } = req.body;

  try {
    const createdUser = await prisma.user.create({
      data: {
        id,
      }
    });

    res.status(200).json(createdUser)
  } catch (error) {
    console.log('Error at creating user: ', error)
    res.status(500).json({ error: 'Failed to create user' })
  }
}