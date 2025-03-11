'use client'
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { useRouter } from "next/navigation";

export default function ConfigPage() {
    const [ShowDeletePosts, setShowDeletePosts] = useState<boolean>(false);
    const [ShowDeleteAcc, setShowDeleteAcc] = useState<boolean>(false);
    
    const router = useRouter();

    const deleteAllPosts = async () => {
        try {
            const token = useAuthStore.getState().token; // Obtém o token do Zustand

            if (!token) {
                alert("Usuário não autenticado!");
                return;
            }

            const response = await fetch("/api/account/delete", {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || "Erro ao deletar posts");
                return;
            }

            alert("Todos os posts foram deletados com sucesso!");
        } catch (error) {
            console.error("Erro ao deletar posts:", error);
            alert("Erro no servidor ao tentar deletar os posts");
        }
    };

    const deleteUser = async () => {
        const token = useAuthStore.getState().token; // token do zustand

        if (!token) {
            alert("Usuário não autenticado!");
            return;
        }

        const response = await fetch("/api/account/delete", {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.error || "Erro ao deletar usuário");
        } else {
            alert("Usuário deletado com sucesso!");
            useAuthStore.getState().logout(); // Desloga o usuário após deletar
            router.push('/');
        }
    };


    return (
        <div>
            <main className="mt-5 text-black dark:text-white">
                <h1 className="font-bold text-3xl mb-3">Configurações</h1>

                <h2 className='font-semibold text-lg dark:border-white'
                >Sua Conta</h2>
                <ul className="mt-0 flex flex-col bg-gray-200 border-l-2 border-black rounded-r-md max-w-[250px] overflow-hidden">
                    <li className="flex py-2 justify-between gap-x-3 items-center px-2 cursor-pointer hover:bg-gray-300"
                        onClick={() => { setShowDeleteAcc(true) }}
                    >
                        <span className="">Deletar Conta</span>
                        <FontAwesomeIcon icon={faTrash} className="cursor-pointer p-1 outline outline-2 rounded-sm" />
                    </li>
                    <li className="flex py-2 justify-between gap-x-3 items-center px-2 cursor-pointer hover:bg-gray-300 "
                        onClick={() => { setShowDeletePosts(true) }}
                    >
                        <span className="">Deletar todos os posts</span>
                        <FontAwesomeIcon icon={faTrash} className="cursor-pointer p-1 outline outline-2 rounded-sm" />
                    </li>
                </ul>

                {ShowDeletePosts && (
                    <div className="fixed inset-0 flex justify-center bg-black/50">
                        <div className="mt-[100px] h-fit bg-black text-white font-sans flex flex-col justify-center py-4 w-[350px] rounded-md">
                            <div className="flex justify-center mb-2">
                                <div className="rounded-full size-24 flex items-center justify-center border-2 border-red-500">
                                    <FontAwesomeIcon className="text-red-500 text-4xl" icon={faTrash} />
                                </div>
                            </div>
                            <p className="text-center text-3xl font-semibold">Deletar Posts?</p>
                            <p className="text-center text-sm px-10 text-gray-400 mt-1 mb-3 leading-relaxed">Tenha em mente que você não poderá recuperar os posts.</p>
                            <div className="flex gap-x-2 justify-center mt-0 px-7">
                                <button className="bg-white duration-150 ease-in-out hover:bg-gray-100 py-2 text-black font-semibold grow rounded-md "
                                    onClick={() => { setShowDeletePosts(false) }}
                                >Cancelar</button>
                                <button className="bg-red-500 hover:bg-red-400 duration-150 ease-in-out py-2 font-semibold grow rounded-md"
                                    onClick={deleteAllPosts}
                                >Deletar</button>
                            </div>
                        </div>
                    </div>
                )}

                {ShowDeleteAcc && (
                    <div className="fixed inset-0 flex justify-center bg-black/50">
                        <div className="mt-[100px] h-fit bg-black text-white font-sans flex flex-col justify-center py-4 w-[350px] rounded-md">
                            <div className="flex justify-center mb-2">
                                <div className="rounded-full size-24 flex items-center justify-center border-2 border-red-500">
                                    <FontAwesomeIcon className="text-red-500 text-4xl" icon={faTrash} />
                                </div>
                            </div>
                            <p className="text-center text-3xl font-semibold">Deletar Conta?</p>
                            <p className="text-center text-sm px-10 text-gray-400 mt-1 mb-3 leading-relaxed">Tenha em mente que você não poderá recuperar sua conta.</p>
                            <div className="flex gap-x-2 justify-center mt-0 px-7">
                                <button className="bg-white duration-150 ease-in-out hover:bg-gray-100 py-2 text-black font-semibold grow rounded-md "
                                    onClick={() => { setShowDeleteAcc(false) }}
                                >Cancelar</button>
                                <button className="bg-red-500 hover:bg-red-400 duration-150 ease-in-out py-2 font-semibold grow rounded-md"
                                    onClick={deleteUser}
                                >Deletar</button>
                            </div>
                        </div>
                    </div>
                )}


            </main>
        </div>
    )
}