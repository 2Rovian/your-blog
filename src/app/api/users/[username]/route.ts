import { NextResponse } from 'next/server'
import User from '@/app/models/User'
import { connectDB } from '@/app/lib/mongodb'

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  const { username } = params // Extrai o username da URL

  try {
    await connectDB()

    // Busca o usuário e popula os posts
    const user = await User.findOne({ username }) // se retirar ".populate('posts')", o código funciona
    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar usuário' }, { status: 500 })
  }
}