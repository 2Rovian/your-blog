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

    // Obtém os dados do post
    const body = await request.json();

    // Garante que title e content são strings válidas
    if (!body.title || typeof body.title !== "string" || !body.content || typeof body.content !== "string") {
      return NextResponse.json({ error: "Título e conteúdo são obrigatórios e devem ser strings" }, { status: 400 });
    }

    const { title, content } = body;

    // Verifica se o usuário existe
    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    const newPost = { title, content, createdAt: new Date() };

    // Garante que o array `posts` existe antes de adicionar um novo post
    if (!Array.isArray(user.posts)) {
      user.posts = [];
    }
    
    user.posts.push(newPost);
    await user.save();

    return NextResponse.json({ message: "Post criado com sucesso", post: newPost }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar post:", error);
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}