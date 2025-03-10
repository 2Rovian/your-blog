import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
    try {
        await connectDB();

        // Obtém e verifica o token JWT
        const authHeader = request.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Token não fornecido" }, { status: 401 });
        }

        const token = authHeader.split(" ")[1];

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string, username: string };
        } catch (error) {
            return NextResponse.json({ error: "Token inválido ou expirado" }, { status: 401 });
        }

        // Obtem bio do corpo da requisiçao
        const { bio } = await request.json();

        // Verifica se a bio foi fornecida
        if (!bio || typeof bio !== "string") {
            return NextResponse.json({ error: "A bio é obrigatória e deve ser uma string" }, { status: 400 });
        }

        // Verifica se o usuário existe
        const user = await User.findById(decoded.id);
        if (!user) {
            return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
        }

        // Atualiza a briefDescription do usuário
        user.briefDescription = bio;
        await user.save();

        // Retorna a resposta de sucesso
        return NextResponse.json({ message: "Bio atualizada com sucesso", user }, { status: 200 });
    } catch (error) {
        console.error("Erro ao atualizar a bio:", error);
        return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });

    }
}