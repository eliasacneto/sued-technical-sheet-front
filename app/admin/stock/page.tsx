"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { stock } from "../../mock/stock.mock";
import React, { useState } from "react";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Stock = () => {
  const [stockList, setStockList] = useState(stock);
  const [searchTerm, setSearchTerm] = useState("");
  const [ingredientName, setIngredientName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [unitSize, setUnitSize] = useState("");
  const [packageContent, setPackageContent] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [totalInvestment, setTotalInvestment] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const calcInvestment = () => {
    const quantityNum = parseFloat(quantity) || 0;
    const unitPriceNum = parseFloat(unitPrice) || 0;
    const investmentTotal = (quantityNum * unitPriceNum).toFixed(2);
    setTotalInvestment(investmentTotal);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
    calcInvestment();
  };

  const handleUnitPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUnitPrice(e.target.value);
    calcInvestment();
  };

  const handleAddItem = () => {
    const newItem = {
      id: stockList.length + 1,
      name: ingredientName,
      brand: brandName,
      unitSize: unitSize,
      packageContent: packageContent,
      unitPrice: parseFloat(unitPrice),
      totalStock: parseFloat(quantity),
      totalInvestment: parseFloat(totalInvestment),
    };

    setStockList([...stockList, newItem]);

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

    // Reset form fields
    setIngredientName("");
    setBrandName("");
    setUnitSize("");
    setPackageContent("");
    setQuantity("");
    setUnitPrice("");
    setTotalInvestment("");
    setIsDialogOpen(false);
  };

  const filteredStockList = stockList.filter(
    (stock) =>
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col justify-start gap-4">
      <h1 className="font-bold text-xl">Estoque</h1>
      <div className="flex justify-end">
        <ToastContainer />
        <Dialog>
          <DialogTrigger>
            <Button
              variant="ghost"
              className="bg-orange-500 hover:bg-orange-600 text-white hover:text-white font-bold"
            >
              + Novo item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cadastrar item no estoque</DialogTitle>
              <DialogDescription>
                Adicione um novo item ao seu estoque
              </DialogDescription>
            </DialogHeader>
            <div className="flex w-full gap-4 mt-4 text-start">
              <div className="flex w-full flex-col gap-2">
                <Label>Nome do ingrediente</Label>
                <Input
                  value={ingredientName}
                  onChange={(e) => setIngredientName(e.target.value)}
                />
              </div>
              <div className="flex w-full flex-col gap-2">
                <Label>Nome da marca</Label>
                <Input
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex w-full gap-4 mt-4 text-start">
              <div className="flex w-full flex-col gap-2">
                <Label>Contém na embalagem</Label>
                <Input
                  value={packageContent}
                  onChange={(e) => setPackageContent(e.target.value)}
                />
              </div>
              <div className="flex w-full flex-col gap-2">
                <Label>Unidade de medida</Label>
                <Select onValueChange={setUnitSize} value={unitSize}>
                  <SelectTrigger>
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
                <Label>Quantidade</Label>
                <Input value={quantity} onChange={handleQuantityChange} />
              </div>
              <div className="flex w-full flex-col gap-2">
                <Label>Preço unitário</Label>
                <Input
                  value={`${unitPrice}`}
                  onChange={handleUnitPriceChange}
                />
              </div>
            </div>
            <div className="flex w-full gap-4 mt-4 text-start">
              <div className="flex w-full flex-col gap-2">
                <Label>Investimento Total</Label>
                <Input value={`R$ ${totalInvestment}`} readOnly />
              </div>
            </div>
            <DialogFooter>
              <Button
                className="bg-orange-500 hover:bg-orange-600 font-bold"
                onClick={handleAddItem}
              >
                Adicionar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex justify-start items-center w-[300px] gap-4">
        <Search size={16} />
        <Input
          placeholder="Pesquisar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex">
        <Card className="w-full p-4">
          <Table>
            <TableCaption className="mt-10 text-gray-400">
              Lista com todos os itens cadastrados.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] font-bold">
                  Ingredientes
                </TableHead>
                <TableHead className="font-bold">Marca</TableHead>
                <TableHead className="font-bold">Conteúdo</TableHead>
                <TableHead className="font-bold">Quantidade</TableHead>
                <TableHead className="font-bold">Preço Unitário</TableHead>
                <TableHead className="font-bold">Investimento Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStockList?.map((stock) => (
                <TableRow key={stock.id}>
                  <TableCell className="font-medium">{stock.name}</TableCell>
                  <TableCell>{stock.brand}</TableCell>
                  <TableCell>
                    {stock.packageContent}
                    {stock.unitSize}
                  </TableCell>
                  <TableCell>{stock.totalStock}</TableCell>
                  <TableCell>R${stock.unitPrice.toFixed(2)}</TableCell>
                  <TableCell>R${stock.totalInvestment.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default Stock;
