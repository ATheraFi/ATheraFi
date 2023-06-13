export default async function handler(req, res) {
  const { id } = req.query;
  const bio = req.body;

  const user = await prisma.user.update({
    where: {
      id: id
    },
    data: {
      bio: bio
    }
  })
  console.log("Updated User: ", user)
  res.send(user);
}