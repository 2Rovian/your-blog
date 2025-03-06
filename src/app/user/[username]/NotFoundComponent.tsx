import Link from "next/link"
export default function NotFoundUser(){
    return (
        <div className="flex justify-center">
            <div className="mt-32 text-center">
                <h1 className="font-bold text-3xl">Usuário não encontrado :/</h1>
                <p className="">Talvez essa conta não exista ou o nome do usuário esteja incorreto.</p>
                <button className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 mt-3 rounded-full">
                    <Link href='/'>Voltar para a Home</Link>
                </button>
            </div>
        </div>
    )
}