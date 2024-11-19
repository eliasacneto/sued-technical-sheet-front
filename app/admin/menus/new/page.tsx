"use client";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Bold,
  Code2,
  Copy,
  Eraser,
  Italic,
  List,
  Pencil,
  Plus,
  PlusCircle,
  Quote,
  Strikethrough,
  Trash,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { ArrowLeft, Search } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const NewMenu = () => {
  const [ingredients, setIngredients] = useState<
    { name: string; unit: string; quantity: string }[]
  >([]);
  const [newIngredient, setNewIngredient] = useState({
    name: "",
    unit: "",
    quantity: "",
  });
  const [editingIngredient, setEditingIngredient] = useState<null | number>(
    null
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const handleEditIngredient = (index: number) => {
    const ingredient = ingredients[index];
    setEditingIngredient(index);
    setNewIngredient(ingredient);
    openDialog();
  };

  const saveIngredient = () => {
    if (!newIngredient.name || !newIngredient.unit || !newIngredient.quantity) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    if (editingIngredient !== null) {
      // Atualiza o ingrediente existente
      setIngredients((prevIngredients) =>
        prevIngredients.map((ingredient, index) =>
          index === editingIngredient ? newIngredient : ingredient
        )
      );
    } else {
      // Adiciona um novo ingrediente
      setIngredients([...ingredients, newIngredient]);
    }

    toast.success("Ingrediente salvo com sucesso!");
    closeDialog();
  };

  return (
    <div className="flex w-full flex-col justify-start gap-4 ">
      <div className="flex flex-col-reverse md:flex-row w-full">
        <div className="flex flex-col w-full antialiased">
          <h3 className="font-bold text-xl md:text-2xl">Adicionar cardápio</h3>
          <p className=" text-base md:text-lg text-gray-400">
            Adicione ingredientes e modo de preparo a um cardápio
          </p>
        </div>
        <div className="flex justify-start gap-4 md:justify-end mb-4">
          <Link href="/admin/menus/new">
            <Button
              variant="outline"
              className=" text-orange-500 hover:text-orange-600  font-bold"
            >
              <ArrowLeft /> Voltar
            </Button>
          </Link>
          <ToastContainer />
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full gap-4 mt-6 md:mt-20">
        <div className="flex w-full  md:w-[60%] flex-col gap-4">
          <div className="flex w-full flex-col gap-2">
            <Label className="text-base">Nome da refeição</Label>
            <Input placeholder="Nome do prato" />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex w-full flex-col gap-2">
              <Label className="text-base">Atende quantas pessoas?</Label>
              <Input placeholder="Ex.: 20" />
            </div>
            <div className="flex w-full flex-col gap-2">
              <Label className="text-base">Cálculo por peso</Label>
              <Select>
                <SelectTrigger className="">
                  <SelectValue placeholder="Selecionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dark">Peso Bruto (cru)</SelectItem>
                  <SelectItem value="light">Peso Cozido</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col mt-4">
            {ingredients.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold ">Ingredientes adicionados</h4>
                <ul className="list-disc pl-5 marker:text-gray-500">
                  {ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span>
                        -{" "}
                        <span className="font-bold">
                          {ingredient.quantity} {ingredient.unit}
                        </span>{" "}
                        de {ingredient.name}
                      </span>
                      <div className="flex gap">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-black"
                          onClick={() => handleEditIngredient(index)}
                        >
                          <Pencil />
                        </Button>
                        <Dialog>
                          <DialogTrigger>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Deseja remover o ingrediente?
                              </DialogTitle>
                              <DialogDescription>
                                Essa ação não poderá ser desfeita.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button variant="secondary">Fechar</Button>
                              <Button
                                variant="destructive"
                                onClick={() => {
                                  setIngredients((prev) =>
                                    prev.filter((_, i) => i !== index)
                                  );
                                  toast.success(
                                    "Ingrediente removido com sucesso!"
                                  );
                                }}
                              >
                                Remover
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center">
            <Button
              variant="ghost"
              className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-500"
              onClick={() => {
                setEditingIngredient(null); // Redefine para adicionar um novo
                setNewIngredient({ name: "", unit: "", quantity: "" }); // Limpa o formulário
                openDialog();
              }}
            >
              <PlusCircle /> Adicionar ingrediente
            </Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild></DialogTrigger>
              <DialogContent className="">
                <DialogHeader>
                  <DialogTitle>
                    {editingIngredient !== null
                      ? "Editar ingrediente"
                      : "Adicionar ingrediente"}
                  </DialogTitle>
                  <DialogDescription>
                    <div className="flex w-full gap-4 mt-4 text-start">
                      <div className="flex w-full flex-col gap-2">
                        <Label>Ingrediente</Label>
                        <Select
                          value={newIngredient.name}
                          onValueChange={(value) =>
                            setNewIngredient({ ...newIngredient, name: value })
                          }
                        >
                          <SelectTrigger className="">
                            <SelectValue placeholder="Selecionar ingrediente" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Arroz">Arroz</SelectItem>
                            <SelectItem value="Feijão">Feijão</SelectItem>
                            <SelectItem value="Macarrão">Macarrão</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex w-full flex-col gap-2">
                        <Label>Unidade de medida</Label>
                        <Select
                          value={newIngredient.unit}
                          onValueChange={(value) =>
                            setNewIngredient({ ...newIngredient, unit: value })
                          }
                        >
                          <SelectTrigger className="">
                            <SelectValue placeholder="Selecionar medida" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Kg">Quilogramas (Kg)</SelectItem>
                            <SelectItem value="g">Gramas (g)</SelectItem>
                            <SelectItem value="L">Litros (L)</SelectItem>
                            <SelectItem value="ml">Mililitros (ml)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex w-full gap-4 mt-4 text-start">
                      <div className="flex w-full flex-col gap-2">
                        <Label>Peso bruto</Label>
                        <Input
                          value={newIngredient.quantity}
                          onChange={(e) =>
                            setNewIngredient({
                              ...newIngredient,
                              quantity: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="flex w-full flex-col gap-2">
                        <Label>Peso líquido</Label>
                        <Input placeholder="" />
                      </div>
                    </div>

                    <div className="flex w-full gap-4 mt-4 text-start">
                      <div className="flex w-full flex-col gap-2">
                        <Label>Fator de correção</Label>
                        <Input placeholder="" />
                      </div>
                      <div className="flex w-full flex-col gap-2">
                        <Label>Peso cozido</Label>
                        <Input placeholder="" />
                      </div>
                    </div>

                    <div className="flex w-full gap-4 mt-4 text-start">
                      <div className="flex w-full flex-col gap-2">
                        <Label>Indíce de cocção</Label>
                        <Input placeholder="" />
                      </div>
                      <div className="flex w-full flex-col gap-2">
                        <Label>Custo ingrediente</Label>
                        <Input placeholder="" />
                      </div>
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    className="bg-orange-500 hover:bg-orange-600 font-bold"
                    onClick={saveIngredient}
                  >
                    Adicionar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <div className="flex flex-col">
            <Label className="text-base mb-2 font-semibold">
              Modo de preparo
            </Label>
            <Card>
              <div className="flex gap-2">
                <ToggleGroup type="multiple">
                  <ToggleGroupItem value="bold" aria-label="Toggle bold">
                    <Bold className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="italic" aria-label="Toggle italic">
                    <Italic className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="underline"
                    aria-label="Toggle underline"
                  >
                    <Strikethrough className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="list" aria-label="Toggle list">
                    <List className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="quote" aria-label="Toggle quote">
                    <Code2 className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="code" aria-label="Toggle code">
                    <Quote className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              <Textarea
                className="w-full"
                rows={6}
                placeholder="Descreva como você prepara a sua receita..."
              />
            </Card>
          </div>
          <div className="flex flex-col mt-2">
            <Label className="text-base mb-2 font-semibold">
              Utensílios e equipamentos{" "}
              <small className="font-normal">(Opcional)</small>
            </Label>
            <Card>
              <div className="flex gap-2">
                <ToggleGroup type="multiple">
                  <ToggleGroupItem value="bold" aria-label="Toggle bold">
                    <Bold className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="italic" aria-label="Toggle italic">
                    <Italic className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="underline"
                    aria-label="Toggle underline"
                  >
                    <Strikethrough className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="list" aria-label="Toggle list">
                    <List className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="quote" aria-label="Toggle quote">
                    <Code2 className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="code" aria-label="Toggle code">
                    <Quote className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              <Textarea
                className="w-full"
                rows={6}
                placeholder="Descreva como você prepara a sua receita..."
              />
            </Card>
          </div>
          <div className="flex justify-center md:justify-end mt-4">
            <Button
              variant="outline"
              className=" flex w-[300px] md:w-[200px] bg-orange-500 hover:bg-orange-600 text-white hover:text-white font-bold"
            >
              <Plus /> Salvar cardápio
            </Button>
          </div>
        </div>
        <div className="flex"></div>
        {/* <Card className="w-full p-4"></Card> */}
      </div>
    </div>
  );
};

export default NewMenu;
