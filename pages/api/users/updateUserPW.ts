import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Update password
async function updateUserPassword(userId: string, newPassword: string) {
    if (newPassword.length < 8) {
        throw new Error('Password must be at least 8 characters long');
    }
    if (!/\d/.test(newPassword)) {
        throw new Error('Password must contain at least one number');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
    }).catch((error) => {
        throw new Error('Failed to update password: ' + error.message);
    });
    return user;
}

// API endpoint for updating password
export const updatePasswordHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId, newPassword } = req.body;
    try {
        const user = await updateUserPassword(userId, newPassword);
        res.status(200).json(user);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
