import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { catchReport } = req.body;

        await prisma.catchReport.create({
        data: {
          ...catchReport,
        },
      });

      res.status(201).json({ message: "Catch report created" });
    } catch (error) {
      res.status(500).json({ error: "Unable to create catch report" });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
