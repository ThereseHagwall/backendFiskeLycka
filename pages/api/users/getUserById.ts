import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Hanterare för att hämta en specifik användare
export default async function getUser(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { userId } = req.query;
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: String(userId),
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    posts: true,
                },
            });
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'Användare hittades inte' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Vi stöder endast GET-förfrågningar' });
    }
}
