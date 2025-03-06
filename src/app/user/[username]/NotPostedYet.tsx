interface NotPostedYet{
    username: string;
}

export default function NotPostedYet({ username }: NotPostedYet){
    return(
        <div className="flex justify-center">
            <p className="text-2xl lg:text-3xl mt-20">Nenhum post de {username} por enquanto.</p>
        </div>
    )
}