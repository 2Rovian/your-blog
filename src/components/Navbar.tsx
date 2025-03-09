'use client'
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faMagnifyingGlass, faGear, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import { IoIosCloseCircleOutline } from "react-icons/io";
import { GoTriangleUp } from "react-icons/go";

import { faMoon } from "@fortawesome/free-solid-svg-icons";
import DarkMode from "./DarkMode";

export default function Navbar() {
    const { user, logout } = useAuthStore();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const [users, setUsers] = useState<{ _id: string; username: string }[]>([]); // Estado para armazenar os usuários encontrados

    useEffect(() => {
        setIsLoading(false);
    }, [user]);

    const menuRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLSpanElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current && !menuRef.current.contains(event.target as Node) &&
                buttonRef.current && !buttonRef.current.contains(event.target as Node)
            ) {
                setIsProfileMenuOpen(false);
            }
            if (
                dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
                inputRef.current && !inputRef.current.contains(event.target as Node)
            ) {
                setIsFocused(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Função para buscar usuários na API
    const fetchUsers = async (searchText: string) => {
        if (!searchText.trim()) {
            setUsers([]); // Se o campo estiver vazio, esvazia os resultados
            return;
        }

        try {
            const response = await fetch(`/api/users/dropdown?q=${searchText}`);
            const data = await response.json();
            setUsers(data.users);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
    };

    // Dispara a busca sempre que o inputValue muda
    useEffect(() => {
        fetchUsers(inputValue);
    }, [inputValue]);

    return (
        <div className="h-[60px] fixed w-full mx-auto max-w-[1280px]">
            <div className="flex justify-between items-center size-full main-div border-b">
                <span className="text-4xl font-bold"
                    style={{ fontFamily: "'Brandmark Sans 2 Color'" }}
                >
                    <Link href='/'>WePost</Link>
                </span>

                {user &&
                    (<div className={`bg-gray-200 dark:bg-gray-900 sm:w-[60%] min-w-[250px] max-w-[600px] relative text-black dark:text-white rounded-3xl flex items-center ${isFocused ? 'outline outline-2 outline-blue-400' : ''}`}>
                        <span className="px-2 ml-1">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </span>
                        <input ref={inputRef} type="text" placeholder="Search"
                            className="py-2 font-sans grow bg-transparent outline-none"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                        />

                        {inputValue && (
                            <span className="p-1 mr-2 cursor-pointer rounded-full hover:bg-white/80 dark:hover:bg-white/30 ease-in-out duration-300"
                                onClick={() => setInputValue('')}
                            >
                                <IoIosCloseCircleOutline className="size-5" />
                            </span>
                        )}

                        {inputValue && isFocused && users.length > 0 && (
                            <div ref={dropdownRef} className="h-fit w-full bg-white dark:bg-gray-900  absolute top-[47px] outline outline-1 outline-gray-400 dark:outline-gray-700 shadow-gray-600 dark:shadow-gray-700 shadow-md rounded-lg flex flex-col overflow-hidden">
                                {users.map((user) => (
                                    <div
                                        key={user._id}
                                        className="w-full h-[40px] cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                                        onClick={() => { setInputValue(''); setIsFocused(false) }}
                                    >
                                        <Link href={`/user/${user.username}`} className="size-full flex items-center gap-x-2 px-3">
                                            <span>
                                                <FontAwesomeIcon icon={faUser} />
                                            </span>
                                            <span>{user.username}</span>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>)
                }

                {isLoading ? (
                    <div />
                ) : user ? (
                    <div className="relative">
                        <span ref={buttonRef}
                            className="bg-gray-900 dark:bg-white text-white dark:text-black size-10 rounded-full flex items-center justify-center text-2xl cursor-pointer"
                            onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                        >
                            <FontAwesomeIcon icon={faUser} />
                        </span>

                        {isProfileMenuOpen && (
                            <div ref={menuRef}
                                className="absolute top-full mt-3 right-0 bg-gray-900 dark:bg-white dark:outline dark:outline-1 dark:outline-gray-600 rounded-lg rounded-tr-md text-lg"
                            >
                                <div className="relative size-full">
                                    <GoTriangleUp className="absolute right-1 -top-5 size-8 text-gray-900 dark:text-white" />

                                    <ul className="flex flex-col gap-y-1 py-2 text-white dark:text-black">
                                        <Link href={`/user/${user.username}`} className="mx-2">
                                            <li className="px-3 gap-x-2 flex items-center hover:bg-white hover:text-gray-900 dark:hover:bg-black dark:hover:text-white hover:rounded-sm ease-in-out duration-150 cursor-pointer">
                                                <FontAwesomeIcon icon={faUser} className="size-[20px]" />
                                                <span>Perfil</span>
                                            </li>
                                        </Link>

                                        <Link href={'/config/'} className="mx-2">
                                            <li className="px-3 gap-x-2 flex items-center hover:bg-white hover:text-gray-900 dark:hover:bg-black dark:hover:text-white hover:rounded-sm ease-in-out duration-150 cursor-pointer">
                                                <FontAwesomeIcon icon={faGear} className="size-[20px]" />
                                                <span>Config</span>
                                            </li>
                                        </Link>

                                        <DarkMode />

                                        <li className="mx-2 px-3 gap-x-2 flex items-center hover:bg-white hover:text-gray-900 dark:hover:bg-black dark:hover:text-white hover:rounded-sm ease-in-out duration-150 cursor-pointer"
                                            onClick={logout}
                                        >
                                            <FontAwesomeIcon icon={faArrowRightFromBracket} className="size-[20px]" />
                                            <span>Sair</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <span className="hover:scale-105 ease-in-out duration-300">
                        <Link href='/login' className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-md">
                            Register / Login
                        </Link>
                    </span>
                )}
            </div>
        </div>
    );
}
