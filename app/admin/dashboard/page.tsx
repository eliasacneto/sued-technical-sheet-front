import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building2,
  ChefHat,
  CookingPot,
  Package,
  ShoppingCart,
  UsersRound,
  Utensils,
} from "lucide-react";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col justify-start gap-4 ">
        <h1 className="font-bold text-xl">Visão Geral </h1>
        <div className="flex gap-4">
          <Card className="w-[300px]">
            <CardHeader>
              <CardTitle className="flex justify-between gap-4">
                <h3 className="font-normal">Cardápios</h3>
                <small>
                  <Utensils size={18} />
                </small>
              </CardTitle>
              <CardDescription>
                <h1 className="text-2xl font-bold">7</h1>
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="w-[300px]">
            <CardHeader>
              <CardTitle className="flex justify-between gap-4">
                <h3 className="font-normal">Receitas</h3>
                <small>
                  <ChefHat size={18} />
                </small>
              </CardTitle>
              <CardDescription>
                <h1 className="text-2xl font-bold">59</h1>
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="w-[300px]">
            <CardHeader>
              <CardTitle className="flex justify-between gap-4">
                <h3 className="font-normal">Ingredientes</h3>
                <small>
                  <CookingPot size={18} />
                </small>
              </CardTitle>
              <CardDescription>
                <h1 className="text-2xl font-bold">147</h1>
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="w-[300px]">
            <CardHeader>
              <CardTitle className="flex justify-between gap-4">
                <h3 className="font-normal">Estoque</h3>
                <small>
                  <Package size={18} />
                </small>
              </CardTitle>
              <CardDescription>
                <h1 className="text-2xl font-bold">1125</h1>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
