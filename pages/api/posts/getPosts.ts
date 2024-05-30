import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getPosts( req: NextApiRequest, res: NextApiResponse ) {
    if (req.method === 'GET') {
        try {
            const users = await prisma.post.findMany({
                select: {
                    id: true,
                    title: true,
                    content: true,
                    image: true,
                    createdAt: true,
                    author: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    reports: { 
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
                        },
                    },
                },
            });
            res.status(200).json(users);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Vi stöder endast GET-förfrågningar' });
    }
}
