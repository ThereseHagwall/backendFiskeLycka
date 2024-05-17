import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Typdefinition för req.body
interface UserRequestBody {
    name: string;
    email: string;
    password: string;
}

// Funktion för att skapa en användare
async function createUser(email: string, name: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new Error('E-postadressen finns redan.');
    }

    const newUser = await prisma.user.create({
        data: {
            email: email,
            name: name,
            password: hashedPassword,
        },
    });

    return newUser;
}

// Hanterare för att skapa en användare
const registerHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name, email, password } = req.body as UserRequestBody;
    try {
        const newUser = await createUser(email, name, password);
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(500).json({ error: error.message});
    }
};

export default registerHandler;