import { NextResponse } from 'next/server'
import User from '@/app/models/User'
import { connectDB } from '@/app/lib/mongodb'

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  const { username } = await params

  try {
    await connectDB()

    // Busca o usuário
    const user = await User.findOne({ username })
    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Erro ao buscar usuário:', error)
    return NextResponse.json({ error: 'Erro ao buscar usuário' }, { status: 500 })
  }
}