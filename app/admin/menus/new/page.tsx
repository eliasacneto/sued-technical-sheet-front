"use client";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { ingredientsRecipe } from '../../../mock/ingredienteRecipe.mock'

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
  const [ingredients, setIngredients] = useState<Array<{
    name: string;
    unit: string;
    quantity: string;
    netWeight: string;
    correctionFactor: string;
    cookedWeight: string;
    cookingIndex: string;
    cost: string;
  }>>([]);

  const [newIngredient, setNewIngredient] = useState({
    name: "",
    unit: "",
    quantity: "",
    netWeight: "", 
    correctionFactor: "", 
    cookedWeight: "", 
    cookingIndex: "", 
    cost: "",
  });

  const [editingIngredient, setEditingIngredient] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const findSelectedIngredient = (name: string) => {
    return ingredientsRecipe.find(ing => ing.name === name);
  };

  const calculateValues = (grossWeight: string, selectedIngredient: any) => {
    if (!grossWeight || !selectedIngredient) return null;

    const weight = parseFloat(grossWeight);

    return {
      netWeight: (weight * selectedIngredient.plBase).toFixed(2),
      correctionFactor: selectedIngredient.fc.toFixed(2),
      cookedWeight: (weight * selectedIngredient.pc).toFixed(2),
      cookingIndex: (selectedIngredient.pc / selectedIngredient.plBase).toFixed(2),
      cost: (weight * selectedIngredient.costPerKg).toFixed(2)
    };
  };

  const handleIngredientSelect = (value: string) => {
    const selectedIngredient = findSelectedIngredient(value);
    if (selectedIngredient) {
      setNewIngredient({
        ...newIngredient,
        name: value,
        unit: selectedIngredient.unit
      });
    }
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const grossWeight = e.target.value;
    const selectedIngredient = findSelectedIngredient(newIngredient.name);

    if (selectedIngredient) {
      const calculations = calculateValues(grossWeight, selectedIngredient);
      if (calculations) {
        setNewIngredient({
          ...newIngredient,
          quantity: grossWeight,
          ...calculations
        });
      }
    }
  };

  const handleEditIngredient = (index: number) => {
    const ingredient = ingredients[index];
    setEditingIngredient(index);
    setNewIngredient(ingredient);
    setIsOpen(true);
  };

  const saveIngredient = () => {
    if (!newIngredient.name || !newIngredient.unit || !newIngredient.quantity) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    if (editingIngredient !== null) {
      setIngredients(prevIngredients =>
        prevIngredients.map((ingredient, index) =>
          index === editingIngredient ? newIngredient : ingredient
        )
      );
    } else {
      setIngredients(prev => [...prev, newIngredient]);
    }

    toast.success("Ingrediente salvo com sucesso!");
    setIsOpen(false);
  };

   const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);


  return (
    <div className="flex w-full flex-col justify-start gap-4">
      {/* Header */}
      <div className="flex flex-col-reverse md:flex-row w-full">
        <div className="flex flex-col w-full antialiased">
          <h3 className="font-bold text-xl md:text-2xl">Adicionar cardápio</h3>
          <p className="text-base md:text-lg text-gray-400">
            Adicione ingredientes e modo de preparo a um cardápio
          </p>
        </div>
        <div className="flex justify-start gap-4 md:justify-end mb-4">
          <Link href="/admin/menus">
            <Button variant="outline" className="text-orange-500 hover:text-orange-600 font-bold">
              <ArrowLeft /> Voltar
            </Button>
          </Link>
          <ToastContainer />
        </div>
      </div>

     
      <div className="flex flex-col md:flex-row w-full gap-4 mt-6 md:mt-20">
        <div className="flex w-full md:w-[60%] flex-col gap-4">
       
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
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bruto">Peso Bruto (cru)</SelectItem>
                  <SelectItem value="cozido">Peso Cozido</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col mt-4">
            {ingredients.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold">Ingredientes adicionados</h4>
                <ul className="list-disc pl-5 marker:text-gray-500">
                  {ingredients.map((ingredient, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span>
                        - <span className="font-bold">
                          {ingredient.quantity} {ingredient.unit}
                        </span> de {ingredient.name}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-black"
                          onClick={() => handleEditIngredient(index)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => {
                            setIngredients(prev => prev.filter((_, i) => i !== index));
                            toast.success("Ingrediente removido com sucesso!");
                          }}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
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
                setEditingIngredient(null);
                setNewIngredient({
                  name: "",
                  unit: "",
                  quantity: "",
                  netWeight: "",
                  correctionFactor: "",
                  cookedWeight: "",
                  cookingIndex: "",
                  cost: "",
                });
                setIsOpen(true);
              }}
            >
              <PlusCircle className="mr-2" /> Adicionar ingrediente
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingIngredient !== null ? "Editar ingrediente" : "Adicionar ingrediente"}
                  </DialogTitle>
                  <DialogDescription>
                
                    <div className="flex w-full gap-4 mt-4 text-start">
                      <div className="flex w-full flex-col gap-2">
                        <Label>Ingrediente</Label>
                        <Select value={newIngredient.name} onValueChange={handleIngredientSelect}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecionar ingrediente" />
                          </SelectTrigger>
                          <SelectContent>
                            {ingredientsRecipe.map((ingredient) => (
                              <SelectItem key={ingredient.id} value={ingredient.name}>
                                {ingredient.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex w-full flex-col gap-2">
                        <Label>Unidade de medida</Label>
                        <Input value={newIngredient.unit} disabled />
                      </div>
                    </div>

            
                    <div className="flex w-full gap-4 mt-4 text-start">
                      <div className="flex w-full flex-col gap-2">
                        <Label>Peso bruto</Label>
                        <Input
                          value={newIngredient.quantity}
                          onChange={handleWeightChange}
                          type="number"
                        />
                      </div>
                      <div className="flex w-full flex-col gap-2">
                        <Label>Peso líquido</Label>
                        <Input value={newIngredient.netWeight} disabled />
                      </div>
                    </div>

                    <div className="flex w-full gap-4 mt-4 text-start">
                      <div className="flex w-full flex-col gap-2">
                        <Label>Fator de correção</Label>
                        <Input value={newIngredient.correctionFactor} disabled />
                      </div>
                      <div className="flex w-full flex-col gap-2">
                        <Label>Peso cozido</Label>
                        <Input value={newIngredient.cookedWeight} disabled />
                      </div>
                    </div>

                    <div className="flex w-full gap-4 mt-4 text-start">
                      <div className="flex w-full flex-col gap-2">
                        <Label>Índice de cocção</Label>
                        <Input value={newIngredient.cookingIndex} disabled />
                      </div>
                      <div className="flex w-full flex-col gap-2">
                        <Label>Custo ingrediente</Label>
                        <Input value={newIngredient.cost} disabled />
                      </div>
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    className="bg-orange-500 hover:bg-orange-600 font-bold"
                    onClick={saveIngredient}
                  >
                    {editingIngredient !== null ? "Atualizar" : "Adicionar"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

   
        <div className="flex w-full flex-col gap-2">
          <div className="flex flex-col">
            <Label className="text-base mb-2 font-semibold">Modo de preparo</Label>
            <Card className="p-4">
              <Textarea
                className="w-full"
                rows={6}
                placeholder="Descreva como você prepara a sua receita..."
              />
            </Card>
          </div>

          <div className="flex flex-col mt-2">
            <Label className="text-base mb-2 font-semibold">
              Utensílios e equipamentos <small className="font-normal">(Opcional)</small>
            </Label>
            <Card className="p-4">
              <Textarea
                className="w-full"
                rows={6}
                placeholder="Liste os utensílios necessários..."
              />
            </Card>
          </div>

          <div className="flex justify-center md:justify-end mt-4">
            <Button
              variant="outline"
              className="flex w-[300px] md:w-[200px] bg-orange-500 hover:bg-orange-600 text-white hover:text-white font-bold"
            >
              <Plus className="mr-2" /> Salvar cardápio
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewMenu;