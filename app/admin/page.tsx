"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <div className="flex lg:flex-row ">
        <div className="lg:flex w-full h-60 lg:h-screen lg:w-[70%] bg-orange-200 bg-admin bg-blend-multiply text-white hidden"></div>
        <div className="flex flex-col bg-white text-black justify-center items-center w-full lg:w-[30%] gap-2 h-screen mx-10  lg:text-start">
          <div className="flex justify-start items-center">
            <img
              className="w-[250px] h-auto"
              src="/assets/images/sued-logo.png"
              alt="logo"
            />
          </div>
          <div className="flex flex-col justify-start items-center w-full text-start ">
            <div className="flex flex-col w-full justify-start items-center mt-8 px-4">
              <div className="text-lg w-full">
                <h1 className="font-bold text-xl">Bem-vindo! 👋</h1>
                <h1 className="text-lg">Acesse com o seu e-mail</h1>
                <br />{" "}
              </div>
            </div>
            <div className="flex flex-col gap-4 justify-center w-full l items-center px-4">
              <form className="flex flex-col w-full gap-4">
                <Input type="email" placeholder="email@email.com" />
                {/* <Input type="password" placeholder="******" /> */}
                <Link href="/admin/dashboard" className="">
                  <Button className="mt-2 bg-orange-500 font-bold shadow-lg hover:bg-orange-600 transform duration-500 w-full">
                    Entrar
                  </Button>
                </Link>
              </form>
            </div>
          </div>
          <footer className="flex flex-col items-center  absolute bottom-0 pb-5 text-sm">
            <p>
              ©2024{" "}
              <Link
                href="#"
                className="text-orange-500 hover:text-orange-600  transform duration-150"
              >
                SUED
              </Link>{" "}
              - Todos os direitos reservados.
            </p>
            {/* <p>
              Desenvolvido por{" "}
              <Link
                href="https://eliasacneto.vercel.app"
                className="text-amber-500  hover:text-amber-600  transform duration-150"
              >
                @eliasacneto
              </Link>
            </p> */}
          </footer>
        </div>
      </div>
    </>
  );
}
