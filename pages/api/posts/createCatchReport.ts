import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function createCatchReport(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { catchReport } = req.body;

      const imageBuffer = catchReport.image
        ? Buffer.from(catchReport.image, "base64")
        : undefined;

      await prisma.catchReport.create({
        data: {
          ...catchReport,
          image: imageBuffer,
        },
      });

      res.status(201).json({ message: "Catch report created" });
    } catch (error) {
      console.error("Error creating catch report:", error);
      res.status(500).json({ error: "Unable to create catch report" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
