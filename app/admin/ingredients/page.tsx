"use client";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ingredients } from "../../mock/ingredients.mock";

import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
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
import { Card, CardTitle } from "@/components/ui/card";
import Link from "next/link";

// const invoices = [
//   {
//     invoice: "INV001",
//     paymentStatus: "Paid",
//     totalAmount: "250",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV001",
//     paymentStatus: "Paid",
//     totalAmount: "250",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV002",
//     paymentStatus: "Pending",
//     totalAmount: "150",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV003",
//     paymentStatus: "Unpaid",
//     totalAmount: "350",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV004",
//     paymentStatus: "Paid",
//     totalAmount: "450",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV005",
//     paymentStatus: "Paid",
//     totalAmount: "550",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV006",
//     paymentStatus: "Pending",
//     totalAmount: "200",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV007",
//     paymentStatus: "Unpaid",
//     totalAmount: "300",
//     paymentMethod: "Credit Card",
//   },
// ];

const Ingredients = () => {
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
      <h1 className="font-bold text-xl">Ingredientes </h1>
      <div className="flex justify-end">
        <Link href="/admin/menus/new">
          <Button className="bg-orange-500 hover:bg-orange-600 font-bold">
            + Novo ingrediente
          </Button>
        </Link>
        <ToastContainer />
      </div>
      <div className="flex justify-start items-center w-[300px] gap-4">
        <Search size={16} />
        <Input placeholder="Pesquisar..."></Input>
      </div>
      <div className="flex">
        <Card className="w-full p-4">
          <Table>
            <TableCaption className="mt-10 text-gray-400">
              Lista com todas os ingredientes cadastrados.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] font-bold">
                  Ingrediente
                </TableHead>
                <TableHead className="font-bold">Peso Bruto</TableHead>
                <TableHead className="font-bold">Fator de Correção</TableHead>
                <TableHead className="font-bold">Peso Liquido</TableHead>
                <TableHead className="font-bold">Kcal</TableHead>
                <TableHead className="font-bold">Proteina</TableHead>
                <TableHead className="font-bold">carboidrato</TableHead>
                <TableHead className="font-bold">Lipídios</TableHead>
                <TableHead className="font-bold">Vit. A</TableHead>
                <TableHead className="font-bold">Vit. C</TableHead>
                <TableHead className="font-bold">Calcio</TableHead>
                <TableHead className="font-bold">Cálcio</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ingredients?.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.name}</TableCell>
                  <TableCell className="font-medium">{invoice.pb}</TableCell>
                  <TableCell className="font-medium"> {invoice.fc}</TableCell>
                  <TableCell className="font-medium"> {invoice.pl}</TableCell>
                  <TableCell className="font-medium"> {invoice.kcal}</TableCell>
                  <TableCell className="font-medium"> {invoice.ptn}</TableCell>
                  <TableCell className="font-medium"> {invoice.cho}</TableCell>
                  <TableCell className="font-medium"> {invoice.lpd}</TableCell>
                  <TableCell className="font-medium"> {invoice.vitA}</TableCell>
                  <TableCell className="font-medium"> {invoice.vitC}</TableCell>
                  <TableCell className="font-medium">
                    {" "}
                    {invoice.calcio}
                  </TableCell>
                  <TableCell className="font-medium">
                    {" "}
                    {invoice.ferro}
                  </TableCell>
                  <TableCell className="text-right"></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default Ingredients;

/**
 * {
    id: 1,
    name: "frango",
    pb: 190.4,
    fc: 2.38,
    pl: 80,
    kcal: 103.2,
    ptn: 16.48,
    cho: null,
    lpd: 3.68,
    vitA: 3.2,
    vitC: null,
    calcio: 5.6,
    ferro: 0.4,
  },
 */
