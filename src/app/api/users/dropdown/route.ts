import { NextResponse } from 'next/server';
import User from '@/app/models/User';
import { connectDB } from '@/app/lib/mongodb';

export async function GET(request: Request) {
    try {
        await connectDB();

        // Pega o parâmetro "q" da query string
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q');

        if (!query) {
            return NextResponse.json({ users: [] });
        }

        // Busca usuários cujo username contém o texto digitado (case insensitive)
        const users = await User.find({ 
            username: { $regex: query, $options: 'i' } 
        }).limit(5); // Limita a 5 resultados para evitar sobrecarga

        return NextResponse.json({ users });
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        return NextResponse.json({ error: 'Erro ao buscar usuários' }, { status: 500 });
    }
}
