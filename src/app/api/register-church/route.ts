import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const {
    churchName,
    churchEmail,
    churchPhone,
    churchAddress,
    adminName,
    adminEmail,
    password,
  } = await request.json();

  if (!churchName || !churchEmail || !churchPhone || !churchAddress || !adminName || !adminEmail || !password) {
    return NextResponse.json(
      { success: false, message: "All fields are required" },
      { status: 400 }
    );
  }

  const existingChurch = await prisma.church.findUnique({ where: { email: churchEmail } });
  if (existingChurch) {
    return NextResponse.json(
      { success: false, message: "A church with that email already exists" },
      { status: 409 }
    );
  }

  const existingMember = await prisma.member.findUnique({ where: { email: adminEmail } });
  if (existingMember) {
    return NextResponse.json(
      { success: false, message: "That admin email is already registered" },
      { status: 409 }
    );
  }

  // Status defaults to PENDING (from your schema) until a super admin approves it
  const church = await prisma.church.create({
    data: {
      name: churchName,
      email: churchEmail,
      phone: churchPhone,
      address: churchAddress,
    },
  });

  const hashedPassword = await bcrypt.hash(password, 10);

  const memberCount = await prisma.member.count();
  const memberId = `SHF-${String(memberCount + 1).padStart(5, "0")}`;

  await prisma.member.create({
    data: {
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      memberId,
      churchId: church.id,
      role: "CHURCH_ADMIN",
    },
  });
  return NextResponse.json({
    success: true,
    message: "Church registered! Awaiting approval.",
  });
}