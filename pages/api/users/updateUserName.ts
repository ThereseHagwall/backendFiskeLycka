import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Update name
async function updateUserName(userId: string, newName: string) {
    const user = await prisma.user.update({
        where: { id: userId },
        data: { name: newName },
    });
    return user;
}

// API endpoint for updating name
export default async function updateNameHandler(req: NextApiRequest, res: NextApiResponse) {
    const { userId, newName } = req.body;
    try {
        await updateUserName(userId, newName);
        res.status(200).json({ message: 'Användarnamnet uppdaterades' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}