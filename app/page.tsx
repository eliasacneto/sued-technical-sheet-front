"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenuOnClick = (sectionId: string) => {
    setIsMenuOpen(false);
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="flex fixed items-center z-40 bg-white w-full lg:hidden px-6 py-6 shadow-md">
        <a href="#" className="flex items-center font-bold">
          <img
            className="w-[80px] h-auto"
            src="/assets/images/sued-logo.png"
            alt="logo"
          />
        </a>

        <button
          onClick={toggleMenu}
          className="fixed flex items-center top-2 right-0 p-4 z-40 lg:hidden lg:bg-none rounded-lg"
        >
          <MenuIcon size={28} className="text-orange-500 font-bold" />
        </button>
      </div>
      {/* Menu */}
      <header className="lg:fixed w-full lg:bg-white bg-transparent h-12 md:h-24 px-8 md:px-12 lg:px-8 xl:px-28 flex gap-8 items-center bg-white-900 text-white antialiased font-bold mb-20 lg:mb-0 shadow-lg">
        <a
          href="#"
          className="flex items-center font-bold text-gray-800 text-xl"
        >
          <img
            className="w-[150px] h-auto"
            src="/assets/images/sued-logo.png"
            alt="logo"
          />
        </a>

        <div
          className={`fixed lg:relative top-0 left-0 bg-orange-50 z-20 lg:bg-transparent bg-opacity-95 text-center overflow-hidden transition-all duration-500 flex flex-col lg:flex-row gap-8 items-center justify-center w-full lg:h-full lg:opacity-100 ${
            isMenuOpen ? "h-full opacity-100" : "h-0 opacity-0"
          }`}
        >
          <nav className="lg:flex-1 justify-center flex gap-8 flex-col lg:flex-row text-center lg:ml-16">
            <a
              className=" text-orange-500 text-base font-semibold transition-all duration-500"
              href="/"
              onClick={() => closeMenuOnClick("#")}
            >
              Início
            </a>

            <a
              className=" text-gray-500 hover:text-orange-500 text-base font-medium transition-all duration-500"
              href="/store"
              onClick={() => closeMenuOnClick("#how")}
            >
              Solução
            </a>

            <a
              className=" text-gray-500 hover:text-orange-500 text-base font-medium transition-all duration-500"
              href="/customer"
              onClick={() => closeMenuOnClick("#services")}
            >
              Sobre nós
            </a>
          </nav>

          <div className="flex items-center flex-col gap-5 lg:flex-row lg:gap-5">
            <Link
              href="/admin"
              className="flex w-full px-4 py-4 bg-orange-500 rounded-lg text-base font-semibold text-white hover:bg-orange-600 transition-all duration-500 hover:font-semibold"
              onClick={() => closeMenuOnClick("#hero")}
            >
              Acessar Plataforma
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
