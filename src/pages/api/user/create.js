import { hash } from "bcryptjs"
import prisma from "../../../../lib/prisma"


export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("REQ: ", req)
  }
  //   // Check if data is empty
  //   if (!req.body) return res.status(404).json({ error: "You are missing data " })

  //   // Check if user exists already
  //   const { email, password, firstName, lastName } = req.body
  //   const userExists = await prisma.user.findFirst({ where: { email: email }})
  //   if (userExists) return res.status(422).json({ message: 'User with that email already exists' })

  //   // If no user, create user
  //   const newUser = await prisma.user.create({
  //     data: {
  //       email: email,
  //       name: `${firstName} ${lastName}`,
  //       password: await hash(password, 12)
  //     }
  //   })
  //   res.status(201).json({ status: true, user: newUser})
  // } else {
  //   res.status(500).json({ message: "HTTP method not valid."})
  // }
}