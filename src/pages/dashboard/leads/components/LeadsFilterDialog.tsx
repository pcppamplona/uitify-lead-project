import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alertDialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  statusFilter: string | null;
  onStatusChange: (status: string | null) => void;
  sortByScore: "asc" | "desc" | null;
  onSortChange: (sort: "asc" | "desc" | null) => void;
}

export default function LeadsFilterDialog({
  open,
  onOpenChange,
  statusFilter,
  onStatusChange,
  sortByScore,
  onSortChange,
}: Props) {
  const [localStatus, setLocalStatus] = useState<string | null>(statusFilter);
  const [localSort, setLocalSort] = useState<"asc" | "desc" | null>(sortByScore);

  useEffect(() => {
    setLocalStatus(statusFilter);
    setLocalSort(sortByScore);
  }, [statusFilter, sortByScore]);

  const handleApply = () => {
    onStatusChange(localStatus);
    onSortChange(localSort);
    onOpenChange(false);
  };

  const handleReset = () => {
    setLocalStatus(null);
    setLocalSort(null);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Filtrar Leads</AlertDialogTitle>
          <AlertDialogDescription>
            Selecione status e ordenação por score.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 mt-4">
          <Select value={localStatus || ""} onValueChange={(v) => setLocalStatus(v || null)}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Contacted">Contacted</SelectItem>
              <SelectItem value="Qualified">Qualified</SelectItem>
            </SelectContent>
          </Select>

          <Select value={localSort || ""} onValueChange={(v) => setLocalSort(v as "asc" | "desc" || null)}>
            <SelectTrigger>
              <SelectValue placeholder="Ordenar por score" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Score Crescente</SelectItem>
              <SelectItem value="desc">Score Decrescente</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <AlertDialogFooter className="mt-4 flex justify-between">
          <AlertDialogCancel onClick={() => onOpenChange(false)}>Cancelar</AlertDialogCancel>
          <div className="flex gap-2">
            <AlertDialogAction onClick={handleReset} className="bg-gray-200 text-black">Limpar</AlertDialogAction>
            <AlertDialogAction onClick={handleApply} className="bg-primary text-white">Aplicar</AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
