import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from 'uuid';
export async function createUserWithAccount({ name, email, password }) {
    try {
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password,
                accounts: {
                    create: {
                        type: "credentials",
                        provider: "email",
                        providerAccountId: uuidv4(),
                    }
                }
            },
            include: {
                accounts: true
            }
        })
        return newUser
    } catch (error) {
        console.log(error)
    }
}