import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getCatchReports(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const catchReport = await prisma.catchReport.findMany({
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
            console.log(catchReport);
            res.status(200).json(catchReport);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Vi stöder endast GET-förfrågningar' });
    }
}
