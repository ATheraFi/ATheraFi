import prisma from "../../../../lib/prisma"

export default async function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json({
      success: true,
      message: "So this is working"
    })
  }
  if (req.method === "POST") {
    const { id, email_addresses } = req.body;
    
    res.status(200).json({
      success: true,
      user: {
        id: id,
        email: email_addresses[0].email_address,
      }
    })
  }
}