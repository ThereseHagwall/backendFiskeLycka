import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getCatchReports(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const catchReports = await prisma.catchReport.findMany({
        select: {
          id: true,
          date: true,
          location: true,
          weather: true,
          waterTemp: true,
          species: true,
          weight: true,
          length: true,
          bait: true,
          method: true,
          notes: true,
          image: true,
          author: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      const catchReportsWithBase64Images = catchReports.map((report) => {
        const base64Image = report.image
          ? Buffer.from(report.image).toString("base64")
          : "";
        return {
          ...report,
          image: base64Image,
        };
      });

      res.status(200).json(catchReportsWithBase64Images);
    } catch (error: any) {
      console.error("Error fetching catch reports:", error);
      res.status(500).json({ error: "Unable to fetch catch reports" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
