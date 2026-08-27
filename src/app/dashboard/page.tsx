import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {prisma} from "@/app/lib/prisma";

export default async function DashboardPage() {

  const cookieStore = await cookies();
  const memberId = cookieStore.get("memberId")?.value;

  if(!memberId){
    redirect("/login");
  }

  const member = await prisma.member.findUnique({where: {id: memberId}});

  if(!member){
    redirect("/login");
  }

  return (
    <div className="max-w-sm mx-auto mt-24 px-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="mt-2 text-gray-600">Welcome back, {member.name}!</p>
      {member.role !== "MEMBER" && (
        <p className="mt-1 text-sm text-gray-400">Role: {member.role.replace("_", " ")}</p>
      )}
    </div>
  );
}