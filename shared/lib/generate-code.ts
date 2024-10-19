import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function generateCode(phoneNumber: string): Promise<string> {
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  await prisma.phoneVerification.upsert({
    where: { phoneNumber },
    update: {
      code,
      createdAt: new Date(),
    },
    create: {
      phoneNumber,
      code,
    },
  });

  return code;
}
