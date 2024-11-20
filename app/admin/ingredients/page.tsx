"use client";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { ingredientsData as initialIngredients } from "../../mock/ingredients.mock";

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
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface Ingredient {
  id: number;
  name: string;
  pb: number;
  fc: number | null;
  pl: number | null;
  kcal: number | null;
  ptn: number | null;
  cho: number | null;
  lpd: number | null;
  vitA: number | null;
  vitC: number | null;
  calcio: number | null;
  ferro: number | null;
}
const Ingredients = () => {
  const [ingredientsData, setIngredientsData] =
    useState<Ingredient[]>(initialIngredients);
  const [newIngredient, setNewIngredient] = useState<Ingredient>({
    id: 0,
    name: "",
    pb: 0,
    fc: null,
    pl: null,
    kcal: null,
    ptn: null,
    cho: null,
    lpd: null,
    vitA: null,
    vitC: null,
    calcio: null,
    ferro: null,
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewIngredient((prev) => ({
      ...prev,
      [name]: name === "name" ? value : value === "" ? null : Number(value),
    }));
  };

  const saveIngredient = () => {
    if (!newIngredient.name) {
      toast.error("Nome do ingrediente é obrigatório");
      return;
    }

    const ingredient: Ingredient = {
      ...newIngredient,
      id: ingredientsData.length + 1,
    };

    // Explicitly type the update function
    setIngredientsData((prevIngredients: Ingredient[]) => [
      ...prevIngredients,
      ingredient,
    ]);

    toast.success("Ingrediente cadastrado com sucesso!");

    // Reset the new ingredient state
    setNewIngredient({
      id: 0,
      name: "",
      pb: 0,
      fc: null,
      pl: null,
      kcal: null,
      ptn: null,
      cho: null,
      lpd: null,
      vitA: null,
      vitC: null,
      calcio: null,
      ferro: null,
    });
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col justify-start gap-4 ">
      <h1 className="font-bold text-xl">Ingredientes </h1>
      <div className="flex justify-end">
        {/* <Link href="/admin/menus/new"> */}
        <Button
          className="bg-orange-500 hover:bg-orange-600 font-bold"
          onClick={() => setIsOpen(true)}
        >
          + Novo ingrediente
        </Button>
        {/* </Link> */}
        <ToastContainer />
        {/*teste*/}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Ingrediente</DialogTitle>
            </DialogHeader>

            <DialogDescription>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Nome do Ingrediente</Label>
                  <Input
                    name="name"
                    value={newIngredient.name}
                    onChange={handleInputChange}
                    placeholder="Digite o nome do ingrediente"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Peso Bruto (PB)</Label>
                  <Input
                    name="pb"
                    type="number"
                    value={newIngredient.pb || ""}
                    onChange={handleInputChange}
                    placeholder="Digite o peso bruto"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Fator de Correção (FC)</Label>
                  <Input
                    name="fc"
                    type="number"
                    value={newIngredient.fc || ""}
                    onChange={handleInputChange}
                    placeholder="Fator de correção"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Peso Líquido (PL)</Label>
                  <Input
                    name="pl"
                    type="number"
                    value={newIngredient.pl || ""}
                    onChange={handleInputChange}
                    placeholder="Peso líquido"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Calorias (Kcal)</Label>
                  <Input
                    name="kcal"
                    type="number"
                    value={newIngredient.kcal || ""}
                    onChange={handleInputChange}
                    placeholder="Calorias"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Proteína (PTN)</Label>
                  <Input
                    name="ptn"
                    type="number"
                    value={newIngredient.ptn || ""}
                    onChange={handleInputChange}
                    placeholder="Proteína"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Carboidratos (CHO)</Label>
                  <Input
                    name="cho"
                    type="number"
                    value={newIngredient.cho || ""}
                    onChange={handleInputChange}
                    placeholder="Carboidratos"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Lipídios (LPD)</Label>
                  <Input
                    name="lpd"
                    type="number"
                    value={newIngredient.lpd || ""}
                    onChange={handleInputChange}
                    placeholder="Lipídios"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Vitamina A</Label>
                  <Input
                    name="vitA"
                    type="number"
                    value={newIngredient.vitA || ""}
                    onChange={handleInputChange}
                    placeholder="Vitamina A"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Vitamina C</Label>
                  <Input
                    name="vitC"
                    type="number"
                    value={newIngredient.vitC || ""}
                    onChange={handleInputChange}
                    placeholder="Vitamina C"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Cálcio</Label>
                  <Input
                    name="calcio"
                    type="number"
                    value={newIngredient.calcio || ""}
                    onChange={handleInputChange}
                    placeholder="Cálcio"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Ferro</Label>
                  <Input
                    name="ferro"
                    type="number"
                    value={newIngredient.ferro || ""}
                    onChange={handleInputChange}
                    placeholder="Ferro"
                  />
                </div>
              </div>
            </DialogDescription>

            <DialogFooter>
              <Button
                className="bg-orange-500 hover:bg-orange-600 font-bold"
                onClick={saveIngredient}
              >
                Salvar Ingrediente
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
                <TableHead className="font-bold">Peso Líquido</TableHead>
                <TableHead className="font-bold">Kcal</TableHead>
                <TableHead className="font-bold">Proteína</TableHead>
                <TableHead className="font-bold">Carboidratos</TableHead>
                <TableHead className="font-bold">Lipídios</TableHead>
                <TableHead className="font-bold">Vit. A</TableHead>
                <TableHead className="font-bold">Vit. C</TableHead>
                <TableHead className="font-bold">Cálcio</TableHead>
                <TableHead className="font-bold">Ferro</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ingredientsData?.map((ingredients) => (
                <TableRow key={ingredients.id}>
                  <TableCell className="font-medium">
                    {ingredients.name}
                  </TableCell>
                  <TableCell className="font-medium">
                    {ingredients.pb}
                  </TableCell>
                  <TableCell className="font-medium">
                    {" "}
                    {ingredients.fc}
                  </TableCell>
                  <TableCell className="font-medium">
                    {" "}
                    {ingredients.pl}
                  </TableCell>
                  <TableCell className="font-medium">
                    {" "}
                    {ingredients.kcal}
                  </TableCell>
                  <TableCell className="font-medium">
                    {" "}
                    {ingredients.ptn}
                  </TableCell>
                  <TableCell className="font-medium">
                    {" "}
                    {ingredients.cho}
                  </TableCell>
                  <TableCell className="font-medium">
                    {" "}
                    {ingredients.lpd}
                  </TableCell>
                  <TableCell className="font-medium">
                    {" "}
                    {ingredients.vitA}
                  </TableCell>
                  <TableCell className="font-medium">
                    {" "}
                    {ingredients.vitC}
                  </TableCell>
                  <TableCell className="font-medium">
                    {" "}
                    {ingredients.calcio}
                  </TableCell>
                  <TableCell className="font-medium">
                    {" "}
                    {ingredients.ferro}
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
