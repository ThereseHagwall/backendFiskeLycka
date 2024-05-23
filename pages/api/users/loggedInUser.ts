import { NextApiRequest } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function fetchLoggedInUser(req: NextApiRequest) {
    const userId = req.headers['x-user-id'] as string;
    if (!userId) {
        throw new Error('User not authenticated');
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw new Error('User not found');
    }

    return user;
}
