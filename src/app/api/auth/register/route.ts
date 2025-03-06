import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/app/models/User";
import { connectDB } from "@/app/lib/mongodb";

export async function POST(req: Request){
    try {
        await connectDB();
        const { username, password } = await req.json();

        const userExists = await User.findOne({ username });
        if(userExists){
            return NextResponse.json({ error: "Usuário já cadastrado" }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        return NextResponse.json({ message: "Usuário criado com sucesso" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
    }
}