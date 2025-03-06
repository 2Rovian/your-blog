"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitch() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Garante que o tema correto seja exibido após o carregamento no cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Evita piscar ao carregar a página

  return (
    <div
      className={` ${resolvedTheme === "dark" ? "bg-white text-black" : "bg-black text-white"} outline size-14 fixed bottom-4 right-4 justify-center flex items-center rounded-full cursor-pointer `}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <span className="font-semibold">
        {resolvedTheme === "dark" ? "LGT" : "DRK"}
      </span>
    </div>
  );
}
