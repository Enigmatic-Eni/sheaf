import {NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';


export async function GET() {
  // Create a test church (safe to run more than once — won't duplicate)
  const church = await prisma.church.upsert({
    where: { email: "testchurch@sheaf.dev" },
    update: {},
    create: {
      name: "Test Church",
      email: "testchurch@sheaf.dev",
      phone: "08000000000",
      address: "123 Test Street, Lagos",
      status: "ACTIVE",
    },
  });

  // Scramble a test password
  const hashedPassword = await bcrypt.hash("Password123", 10);

  // Create a test member linked to that church
  const member = await prisma.member.upsert({
    where: { email: "testmember@sheaf.dev" },
    update: {},
    create: {
      name: "Test Member",
      email: "testmember@sheaf.dev",
      password: hashedPassword,
      memberId: "SHF-00001",
      churchId: church.id,
    },
  });

  return NextResponse.json({
    message: "Test data ready!",
    loginWith: { email: "testmember@sheaf.dev", password: "Password123" },
  });
}