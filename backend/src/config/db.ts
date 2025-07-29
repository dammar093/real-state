import { PrismaClient } from "../../generated/prisma";

export const db = new PrismaClient();

async function connectDb() {
  await db.$connect();
  console.log("Connected to database");
}

export default connectDb;
