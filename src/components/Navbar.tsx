'use client'
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

export default function Navbar() {
    const { user, logout } = useAuthStore();

    return (
        <div className="h-[70px] ">
            <div className="flex justify-between items-center size-full main-div border-b">
                <span className="text-xl font-semibold"><Link href='/'>YourBlog</Link></span>

                {user ?
                    (<div className="flex gap-x-3 text-lg font-medium">
                        <span>
                            <Link href='/'>Home</Link>
                        </span>
                        <span>
                            <Link href={`/user/${user?.username}`}>Profile</Link>
                        </span>
                        <span onClick={logout} className="cursor-pointer">
                            Logout
                        </span>
                    </div>
                    ) :
                    (<span>
                        <Link href='/login' className="bg-black text-white dark:bg-white dark:text-black px-2 py-1 rounded-md">Register/Login</Link>
                    </span>)
                }


                {/* <div className="flex gap-x-3 text-lg font-medium ">
                    <span>
                        <Link href='/'>Home</Link>
                    </span>
                    <span>
                        <Link href='/profile'>Profile</Link>
                    </span>
                    {user ?
                        (<span onClick={logout} className="cursor-pointer">
                            Logout
                        </span>) :
                        (<span>
                            <Link href='/login' className="bg-black text-white dark:bg-white dark:text-black px-2 py-1 rounded-md">Register/Login</Link>
                        </span>)
                    }
                    
                </div> */}
            </div>
        </div>
    )
}