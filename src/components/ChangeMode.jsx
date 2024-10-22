import React from 'react'

export const ChangeMode = () => {

    const handleChangeTheme = () => {
        if (document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
    };

    // Comprobar el tema al cargar
    if (typeof window !== "undefined") {
        const currentTheme = localStorage.getItem("theme");
        if (currentTheme === "dark") {
            document.documentElement.classList.add("dark");
        }
    }

    return (
        <>
            <button
                onClick={handleChangeTheme}
                className="fixed right-3 top-2 md:inline bg-yellow-300 rounded-full px-3 text-blue-500 text-sm md:text-[16px] border-blue-900 border-solid border-2 mt-1 hover:bg-blue-400 hover:text-yellow-300 lg:font-semibold"
            >
              Light/Dark
            </button>
        </>
    )
}
