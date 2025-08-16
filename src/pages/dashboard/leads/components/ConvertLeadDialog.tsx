// components/leads/ConvertLeadDialog.tsx
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
import type { Lead } from "@/interfaces/leadData";
import { useCreateOpportunity } from "@/hooks/opportunities/useCreateOpportunity";

interface Props {
  lead: Lead | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConvertLeadDialog({ lead, onCancel, onConfirm }: Props) {
  const { createOpportunity, loading } = useCreateOpportunity();

  const handleConvert = async () => {
    if (!lead) return;
    await createOpportunity(lead);
    onConfirm();
  };

  return (
    <AlertDialog open={!!lead} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Converter Lead</AlertDialogTitle>
          <AlertDialogDescription>Deseja converter este lead em oportunidade?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConvert} disabled={loading} className="text-white">
            {loading ? "Convertendo..." : "Converter"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
