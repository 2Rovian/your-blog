'use client'
import { useState } from "react"
import { useAuthStore } from "@/store/authStore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ConfigPage() {
    const [isContaOpen, setisContaOpen] = useState<boolean>(true);
    const [isPerfilOpen, setisPerfilOpen] = useState<boolean>(false);

    const deleteAllPosts = async () => {
        try {
            const token = useAuthStore.getState().token; // Obtém o token do Zustand

            if (!token) {
                alert("Usuário não autenticado!");
                return;
            }

            const response = await fetch("/api/posts/delete", {
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


    return (
        <div>
            <main className="mt-5">
                <h1 className="font-bold text-3xl mb-3 text-black dark:text-white">Configurações</h1>
                <ul className="flex gap-x-2 text-lg text-gray-700 dark:text-gray-200">
                    <li className={`px-3 cursor-pointer ${isContaOpen ? "text-black dark:text-gray-100 border-b-2 border-black dark:border-gray-100" : ""}`}
                        onClick={() => { setisContaOpen(true); setisPerfilOpen(false) }}
                    >Conta</li>
                    <li className={`px-3 cursor-pointer ${isPerfilOpen ? "text-black dark:text-gray-100 border-b-2 border-black dark:border-gray-100" : ""}`}
                        onClick={() => { setisPerfilOpen(true); setisContaOpen(false) }}
                    >Perfil</li>
                </ul>
                {isContaOpen && (
                    <ul className="mt-2 flex flex-col">
                        <li>Deletar Conta</li>
                        <li className="flex gap-x-3 items-center">
                            <span>Deletar todos os posts</span>
                            <FontAwesomeIcon icon={faTrash} className="cursor-pointer p-1 outline outline-2 rounded-sm" 
                            onClick={deleteAllPosts}
                            />
                        </li>
                    </ul>

                )}
                {isPerfilOpen && (
                    <div className="mt-2 flex flex-col">
                        <p>Foto de Perfil</p>
                        <p>Breve Descrição do Perfil</p>
                        <p>Perfil Público</p>
                    </div>
                )}
            </main>
        </div>
    )
}