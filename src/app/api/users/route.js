import { NextResponse } from "next/server";
import { createUserWithAccount } from "@/lib/user";
import bcrypt from 'bcryptjs'
const POST = async (req, res) => {
    try {
        const { name, email, password } = await req.json();
        const userExist = await getUserByEmail(email);
        if (userExist) {
            return NextResponse.json({ error: "User already exist" }, { status: 400 });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await createUserWithAccount({ name, email, password: hashPassword });
        return NextResponse.json({ user: newUser }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

export async function getUserByEmail(email) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        console.log(user)
        return user
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export { POST }