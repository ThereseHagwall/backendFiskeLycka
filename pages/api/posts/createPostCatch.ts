import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function createPostCatch( req: NextApiRequest, res: NextApiResponse ) {
  if (req.method === "POST") {
    try {
      const { post, catchReport } = req.body;

      const createdPost = await prisma.post.create({
        data: post,
      });

      const createdCatchReport = await prisma.catchReport.create({
        data: {
          ...catchReport,
          postId: createdPost.id,
        },
      });

      res.status(201).json({ post: createdPost, catchReport: createdCatchReport });
    } catch (error) {
      res.status(500).json({ error: "Unable to create post and catch report" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
