import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs'
export const options = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: "Credentials",
            type: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },
            async authorize(credentials, req) {
                const { email, password } = credentials;
                 console.log(credentials)
                const user = await prisma.user.findUnique({
                    where: {
                        email: email,
                    }, 
                });

                const hashedPassword = await user.password
                const passwordMatch = await bcrypt.compare(password, hashedPassword);

                if (passwordMatch) {
                    return user
                } else {
                    return null
                }

            }
        }),
    ],
    session: {
        strategy: "jwt"
    },
    // pages: {
    //     signIn: "/login",
        
    // },
    secret: process.env.NEXT_AUTH_SECRET,
}