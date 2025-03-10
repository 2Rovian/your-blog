import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import jwt from "jsonwebtoken";

export async function DELETE(request: Request) {
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

    // Verifica se o usuário existe
    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    // Remove todos os posts do usuário
    user.posts = [];
    await user.save();

    return NextResponse.json({ message: "Todos os posts foram deletados com sucesso" }, { status: 200 });
  } catch (error) {
    console.error("Erro ao deletar posts:", error);
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}
