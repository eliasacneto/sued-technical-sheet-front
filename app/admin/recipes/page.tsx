"use client";

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

import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, Trash } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MenuViewDialog from "@/components/menuViewDialog";

const Recipes = () => {
  const [menuState, setMenuState] = useState(menu);

  const [selectedMonth, setSelectedMonth] =
    useState<keyof typeof menu>("Novembro");

  const [weekType, setWeekType] = useState<"oddWeeks" | "evenWeeks">(
    "oddWeeks"
  );

  const currentMenuItems = menuState[selectedMonth][weekType];

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

  const handleView = (day: string, meal: string) => {
    toast.info(`Visualizando: ${day} - ${meal}`, {
      position: "bottom-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="flex flex-col justify-start gap-4 ">
      <h1 className="font-bold text-xl">Cardápios</h1>
      <div className="flex justify-end">
        <Link href="/admin/recipes/new">
          <Button className="bg-orange-500 hover:bg-orange-600 font-bold">
            + Novo cardápio
          </Button>
        </Link>
        <ToastContainer />
      </div>
     
    
    </div>
  );
};

export default Recipes;


{/* <div className="flex mt-6">
  <Card className="w-full p-4">
    <Table>
      <TableCaption className="mt-10 text-gray-400">
        Cardápio do mês de {selectedMonth} -{" "}
        {weekType === "oddWeeks" ? "Semanas Ímpares" : "Semanas Pares"}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px] font-bold">Dia</TableHead>
          <TableHead className="font-bold">Refeição</TableHead>
          <TableHead className=" text-end font-bold">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(currentMenuItems).map(([day, meal]) => (
          <TableRow key={day}>
            <TableCell className="font-medium">{day}</TableCell>
            <TableCell>{meal}</TableCell>
            <TableCell className="text-end">
              <div className="flex justify-end gap-2">
                {/* Botão de Visualizar */}

//                 <MenuViewDialog
//                   day={day}
//                   meal={meal}
//                   month={selectedMonth}
//                   weekType={weekType}
//                 />
//                 <Dialog>
//                   <DialogTrigger>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       <Trash />
//                     </Button>
//                   </DialogTrigger>
//                   <DialogContent>
//                     <DialogHeader>
//                       <DialogTitle>
//                         Deseja remover o cardápio?
//                       </DialogTitle>
//                       <DialogDescription>
//                         Essa ação não poderá ser desfeita.
//                       </DialogDescription>
//                     </DialogHeader>
//                     <DialogFooter>
//                       <Button variant="secondary">Fechar</Button>
//                       <Button
//                         variant="destructive"
//                         onClick={() =>
//                           setMenuState((prevMenu) => ({
//                             ...prevMenu,
//                             [selectedMonth]: {
//                               ...prevMenu[selectedMonth],
//                               [weekType]: Object.fromEntries(
//                                 Object.entries(
//                                   prevMenu[selectedMonth][weekType]
//                                 ).filter(([key]) => key !== day)
//                               ),
//                             },
//                           }))
//                         }
//                       >
//                         Remover
//                       </Button>
//                     </DialogFooter>
//                   </DialogContent>
//                 </Dialog>
//                 {/* <Button
//                         variant="ghost"
//                         className="text-red-500 hover:text-red-600 px-2 py-1"
//                         onClick={() => handleDelete(day)}
//                       >
//                         <Trash />
//                       </Button> */}
//               </div>
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   </Card>
// </div> */}