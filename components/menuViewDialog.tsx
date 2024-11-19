import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { jsPDF } from "jspdf";

type MenuViewDialogProps = {
  day: string;
  meal: string;
  month: string;
  weekType: string;
};

const MenuViewDialog: React.FC<MenuViewDialogProps> = ({
  day,
  meal,
  month,
  weekType,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleExportToPDF = () => {
    const doc = new jsPDF();

    // Styling and content
    doc.setFontSize(16);
    doc.text("Detalhes do Cardápio", 20, 20);

    doc.setFontSize(12);
    doc.text(`Mês: ${month}`, 20, 30);
    doc.text(
      `Tipo de Semana: ${
        weekType === "oddWeeks" ? "Semanas Ímpares" : "Semanas Pares"
      }`,
      20,
      40
    );
    doc.text(`Dia: ${day}`, 20, 50);
    doc.text(`Refeição: ${meal}`, 20, 60);

    // Save the PDF
    doc.save(`cardapio_${month}_${day}.pdf`);
  };

  return (
    <>
      <Button
        variant="ghost"
        className="px-2 py-1"
        onClick={() => setIsOpen(true)}
      >
        <Eye />
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes do Cardápio</DialogTitle>
            <DialogDescription>
              Informações detalhadas sobre o item do cardápio
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <strong>Mês:</strong> {month}
            </div>
            <div>
              <strong>Tipo de Semana:</strong>
              {weekType === "oddWeeks" ? "Semanas Ímpares" : "Semanas Pares"}
            </div>
            <div>
              <strong>Dia:</strong> {day}
            </div>
            <div>
              <strong>Refeição:</strong> {meal}
            </div>
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Fechar
            </Button>
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold"
              onClick={handleExportToPDF}
            >
              Exportar Ficha técnica
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MenuViewDialog;
