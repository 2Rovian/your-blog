import { NextResponse } from "next/server";
import User from "@/app/models/User";
import { connectDB } from "@/app/lib/mongodb";

export async function GET(
    request: Request,
    { params }: { params: { username: string } }
    // recebe o parâmetro da URL
){
    try {
        await connectDB();

        const { username } = params; // recebe o username da url

        // buscar user na database
        const user = await User.findOne({ username }, { password: 0 });

        if(!user){
            return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 })
        }

        // Retorna usuário
        return NextResponse.json({ user });
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar usuário" }, { status: 500 });
    }
}