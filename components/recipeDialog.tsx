import jsPDF from "jspdf";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";


interface Recipe {
  id: number;
  name: string;
  preparation_method: string;
  required_utensils: string;
  prep_time: number;
  servings: number;
  total_cost: string;
  created_by_name: string;
  school_name: string;
  metrics: {
    cost_per_serving: number;
    total_ingredients: number;
    average_ingredient_cost: number;
  };
  ingredients: RecipeIngredient[];
}

interface RecipeIngredient {
  ingredient_description: string;
  quantity: string;
  unit_of_measure: string;
  total_cost: number;
  kcal: string;
  protein: string;
  lipids: string;
  carbohydrate: string;
  calcium: string;
  iron: string;
}


const RecipeDialog = (recipe:Recipe) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleExportToPDF = () => {
       
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

       
        let yPosition = 20;
        const margin = 20;

                doc.setFontSize(18);
        doc.text(recipe.name, margin, yPosition);
        yPosition += 10;

      
        doc.setFontSize(12);
        doc.text(`Porções: ${recipe.servings}`, margin, yPosition);
        yPosition += 10;
        doc.text(`Custo Total: R$ ${recipe.total_cost}`, margin, yPosition);
        yPosition += 10;
        doc.text(`Custo por Porção: R$ ${recipe.metrics.cost_per_serving.toFixed(2)}`, margin, yPosition);
        yPosition += 15;

      
        const headers = ['Ingrediente', 'Quantidade', 'Unidade', 'Kcal', 'Custo'];
        const columnWidths = [60, 30, 30, 30, 30];

       
        doc.setFontSize(14);
        let xPosition = margin;
        headers.forEach((header, index) => {
            doc.text(header, xPosition, yPosition);
            xPosition += columnWidths[index];
        });
        yPosition += 10;

       
        doc.setFontSize(10);
        recipe?.ingredients?.forEach((ingredient) => {
            xPosition = margin;
            const rowData = [
                ingredient.ingredient_description,
                ingredient.quantity,
                ingredient.unit_of_measure,
                ingredient.kcal,
                `R$ ${ingredient.total_cost.toFixed(2)}`
            ];

            rowData.forEach((data, index) => {
                doc.text(data, xPosition, yPosition);
                xPosition += columnWidths[index];
            });

            yPosition += 10;

           
            if (yPosition > 280) {
                doc.addPage();
                yPosition = 20;
            }
        });

      
        yPosition += 10;
        doc.setFontSize(14);
        doc.text('Método de Preparo', margin, yPosition);
        yPosition += 10;
        doc.setFontSize(10);

       
        const splitText = doc.splitTextToSize(recipe.preparation_method, 170);
        doc.text(splitText, margin, yPosition);

       
        doc.save(`${recipe.name}_receita.pdf`);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{recipe.name}</DialogTitle>
                    <DialogDescription>Detalhes completos da receita</DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <h3 className="font-semibold">Informações da Receita</h3>
                        <p>Custo Total: R$ {recipe.total_cost}</p>
                        <p>Custo por Porção: R$ {recipe.metrics.cost_per_serving.toFixed(2)}</p>
                        <p>Número de Porções: {recipe.servings}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold">Utensílios Necessários</h3>
                        <p>{recipe.required_utensils}</p>
                    </div>
                </div>

                <h3 className="text-lg font-bold mb-2">Ingredientes</h3>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Ingrediente</TableHead>
                            <TableHead>Quantidade</TableHead>
                            <TableHead>Unidade</TableHead>
                            <TableHead>Kcal</TableHead>
                            <TableHead>Custo</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recipe?.ingredients?.map((ingredient, index) => (
                            <TableRow key={index}>
                                <TableCell>{ingredient.ingredient_description}</TableCell>
                                <TableCell>{ingredient.quantity}</TableCell>
                                <TableCell>{ingredient.unit_of_measure}</TableCell>
                                <TableCell>{ingredient.kcal}</TableCell>
                                <TableCell>R$ {ingredient.total_cost.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <h3 className="text-lg font-bold mt-4 mb-2">Método de Preparo</h3>
                <p>{recipe.preparation_method}</p>

                <DialogFooter>
                    <Button variant="secondary" onClick={() => setIsOpen(false)}>
                        Fechar
                    </Button>
                    <Button
                        onClick={handleExportToPDF}
                        className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                        Exportar PDF
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default RecipeDialog;