import { PrismaClient } from "@prisma/client";
let prisma;
if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

export default prisma;
// DATABASE_URL=mongodb+srv://dat_auth:x6W5EOckqm6yZuvp@clusterleanring.v3drs.mongodb.net/?retryWrites=true&w=majority&appName=ClusterLeanring