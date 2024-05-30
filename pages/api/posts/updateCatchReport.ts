import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function updateCatchReport( req: NextApiRequest, res: NextApiResponse ) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const {
    catchReportId,
    newLocation,
    newSpecies,
    newWeight,
    newLength,
    newBait,
    newMethod,
    newWeather,
    newWaterTemp,
    newNotes,
    newImage,
  } = req.body;

  try {
    const updateData: Record<string, any> = {};
    if (newLocation) updateData.location = newLocation;
    if (newSpecies) updateData.species = newSpecies;
    if (newWeight) updateData.weight = newWeight;
    if (newLength) updateData.length = newLength;
    if (newBait) updateData.bait = newBait;
    if (newMethod) updateData.method = newMethod;
    if (newWeather) updateData.weather = newWeather;
    if (newWaterTemp) updateData.waterTemp = newWaterTemp;
    if (newNotes) updateData.notes = newNotes;
    if (newImage) updateData.image = newImage;

    const updatedCatchReport = await prisma.catchReport.update({
      where: { id: catchReportId },
      data: updateData,
    });

    res.status(200).json({ message: "Catch report updated successfully", updatedCatchReport });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
