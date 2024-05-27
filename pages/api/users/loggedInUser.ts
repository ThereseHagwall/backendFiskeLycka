import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUser(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const { id } = req.query;
            const user = await prisma.user.findUnique({
                where: {
                    id: String(id),
                },
            });
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'Användaren hittades inte' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Vi stöder endast GET-förfrågningar' });
    }
}