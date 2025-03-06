import { NextResponse } from "next/server";
import User from "@/app/models/User";
import { connectDB } from "@/app/lib/mongodb";

export async function GET() {
    try {
        await connectDB();

        const users = await User.find({}, { password: 0 }); // Exclui a senha dos resultados

        return NextResponse.json({ users });
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar usuários" }, { status: 500 });
    }
}
