import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/app/models/User";
import { connectDB } from "@/app/lib/mongodb";

export async function POST(req: Request) {
    try {
        await connectDB();
        const { username, password } = await req.json();

        // Verifica se o usuário existe pelo username
        const user = await User.findOne({ username });
        if (!user) {
            return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
        }

        // Compara a senha fornecida com a senha armazenada
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
        }

        console.log("Horário atual do servidor (UTC):", new Date().toUTCString());

        // Gera um token JWT
        const token = jwt.sign(
            { id: user._id.toString(), username: user.username },
            process.env.JWT_SECRET as string,
            { expiresIn: "2h"}
        );

        // Retorna o token e dados do usuário (sem expor a senha)
        return NextResponse.json({
            token,
            user: {
                id: user._id,
                username: user.username,
            }
        });
    } catch (error) {
        return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
    }
}
