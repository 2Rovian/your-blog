'use client'
import { useState } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

export default function ConfigPage() {
    const [isContaOpen, setisContaOpen] = useState<boolean>(true);
    const [isPerfilOpen, setisPerfilOpen] = useState<boolean>(false);
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
                    <div className="mt-2 flex flex-col">
                        <div>Deletar Conta</div>
                    </div>
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