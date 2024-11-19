'use client';

import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { menu } from "../../mock/menu.mock";

import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const Menus = () => {
  const [selectedMonth, setSelectedMonth] = useState<keyof typeof menu>("November");
  const [weekType, setWeekType] = useState<"oddWeeks" | "evenWeeks">("oddWeeks");

  const currentMenuItems = menu[selectedMonth][weekType];

  const notify = () =>
    toast.success("Cadastro feito com sucesso!", {
      position: "bottom-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  return (
    <div className="flex flex-col justify-start gap-4 ">
      <h1 className="font-bold text-xl">Cardápios</h1>
      <div className="flex justify-end">
        <Link href="/admin/menus/new">
          <Button className="bg-orange-500 hover:bg-orange-600 font-bold">
            + Novo cardápio
          </Button>
        </Link>
        <ToastContainer />
        {/* 
          Diálogo desabilitado temporariamente. 
          Mantido como comentário para possível futura implementação.
        */}
        {/* <Dialog>
          <DialogTrigger>
            <Button
              className="bg-orange-500 hover:bg-orange-600 font-bold"
              onClick={notify}
            >
              + Novo cardápio
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog> */}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value as keyof typeof menu)}
            className="p-2 border rounded"
          >
            {Object.keys(menu).map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <select
            value={weekType}
            onChange={(e) => setWeekType(e.target.value as "oddWeeks" | "evenWeeks")}
            className="p-2 border rounded"
          >
            <option value="oddWeeks">Semanas Ímpares</option>
            <option value="evenWeeks">Semanas Pares</option>
          </select>
        </div>

      </div>
      <div className="flex justify-start items-center w-[300px] gap-4">
        <Search size={16} />
        <Input placeholder="Pesquisar..." />
      </div>
      <div className="flex">
        <Card className="w-full p-4">
          <Table>
            <TableCaption className="mt-10 text-gray-400">
              Cardápio do mês de {selectedMonth} - {weekType === "oddWeeks" ? "Semanas Ímpares" : "Semanas Pares"}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] font-bold">Dia</TableHead>
                <TableHead className="font-bold">Refeição</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(currentMenuItems).map(([day, meal]) => (
                <TableRow key={day}>
                  <TableCell className="font-medium">{day}</TableCell>
                  <TableCell>{meal}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            {/* 
              Tabela desativada para possível futura adição.
            */}
            {/* <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
              </TableRow>
            </TableFooter> */}
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default Menus;

