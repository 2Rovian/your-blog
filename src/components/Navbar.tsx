'use client'
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
    const { user, logout } = useAuthStore();
    const [isLoading, setIsLoading] = useState(true);


    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    useEffect(() => {
        setIsLoading(false);
    }, [user]);

    return (
        <div className="h-[70px]">
            <div className="flex justify-between items-center size-full main-div border-b">
                <span className="text-4xl font-bold"
                style={{ fontFamily: "'Brandmark Sans 2 Color'" }}
                >
                    <Link href='/'>WePost</Link>
                </span>

                {isLoading ? (
                    <div />
                ) : user ? (
                    <div className={`flex gap-x-3 text-lg font-medium items-center ${isProfileMenuOpen && 'bg-slate-200 dark:bg-black dark:outline dark:outline-1 dark:outline-gray-600 rounded-lg shadow-md pr-1'}`}>
                        {isProfileMenuOpen &&
                            (<div className="flex flex-col">
                                <span className="cursor-pointer hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black ease-in-out duration-300 rounded-tl-lg">
                                    <Link href={`/user/${user.username}`} className="px-2">Profile</Link>
                                </span>
                                <span onClick={logout} className="cursor-pointer hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black ease-in-out duration-300 rounded-bl-lg px-2">Logout</span>
                            </div>)}

                        <span className="bg-gray-900 dark:bg-white text-white dark:text-black size-12 rounded-full flex items-center justify-center text-2xl cursor-pointer"
                            onClick={() => { setIsProfileMenuOpen(!isProfileMenuOpen) }}
                        >
                            <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                        </span>

                    </div>
                ) : (
                    <span>
                        <Link href='/login' className="bg-black text-white dark:bg-white dark:text-black px-2 py-1 rounded-md">
                            Register/Login
                        </Link>
                    </span>
                )}
            </div>
        </div>
    );
}
