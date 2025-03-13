"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";

export default function ThemeSwitch() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <li className="mx-2 px-3 gap-x-2 flex items-center hover:bg-white hover:text-gray-900 dark:hover:bg-black dark:hover:text-white hover:rounded-sm ease-in-out duration-150 cursor-pointer"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
            <FontAwesomeIcon icon={resolvedTheme === "dark" ? faMoon : faSun} className="size-[20px]" />
            <span>{resolvedTheme === "dark" ? "Escuro" : "Claro"}</span>
        </li>
    );
}
