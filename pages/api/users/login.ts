import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Typdefinition för req.body
interface UserRequestBody {
    email: string;
    password: string;
}

// Funktion för att logga in en användare
async function loginUser(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    return { success: true, userId: user.id };
}

// Hanterare för att logga in en användare
const loginHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, password } = req.body as UserRequestBody;
    try {
        const loginResult = await loginUser(email, password);
        res.status(200).json(loginResult);
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
};

export default loginHandler;