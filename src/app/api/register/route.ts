import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { success: false, message: "All fields are required" },
      { status: 400 }
    );
  }

  const existing = await prisma.member.findUnique({ where: { email } });
  if (existing) { 
    return NextResponse.json(
      { success: false, message: "That email is already registered" },
      { status: 409 }
    );
  }

  // For now, every new member joins our one test church
  const church = await prisma.church.findUnique({
    where: { email: "testchurch@sheaf.dev" },
  });

  if (!church) {
    return NextResponse.json(
      { success: false, message: "No church available to join yet" },
      { status: 500 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const memberCount = await prisma.member.count();
  const memberId = `SHF-${String(memberCount + 1).padStart(5, "0")}`;

  await prisma.member.create({
    data: {
      name,
      email,
      password: hashedPassword,
      memberId,
      churchId: church.id,
    },
  });

  return NextResponse.json({ success: true, message: "Account created!" });
}