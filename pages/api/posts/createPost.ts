import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function createPost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { post } = req.body;

        await prisma.post.create({
        data: {
          ...post,
        },
      });

      res.status(201).json({ message: "Post created" });
    } catch (error) {
      res.status(500).json({ error: "Unable to create post" });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
