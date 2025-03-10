import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";

export async function GET(
  req: Request,
  { params }: { params: { username: string; title: string } }
) {
  await connectDB();

  try {
    const { username, title } = params;
    const decodedTitle = decodeURIComponent(title); // Decodifica o título

    // Busca o usuário pelo username
    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    // Busca o post pelo título dentro da lista de posts do usuário
    const post = user.posts.find((p: { title: string }) => p.title === decodedTitle);

    if (!post) {
      return NextResponse.json({ error: "Post não encontrado" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar post:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
