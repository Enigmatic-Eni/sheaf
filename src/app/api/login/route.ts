import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest){
    const {email, password} = await request.json();

    const member = await prisma.member.findUnique({
        where: {email},
    });

    if(!member){
        return NextResponse.json(
            {success: false,
                message: 'No account found with this email'
            },
            {status: 401}
        );
    }


    const passwordMatches = await bcrypt.compare(password, member.password);

    if(!passwordMatches){
        return NextResponse.json(
            {success: false,
                message: "Incorrect Password"
            },
            {status: 401}
        );
    }

    const response = NextResponse.json({
        success: true,
        message:`Welcome, ${member.name}!`,
    });

   response.cookies.set("memberId", member.id,{
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 27 * 7,
   });

   return response;
    
}