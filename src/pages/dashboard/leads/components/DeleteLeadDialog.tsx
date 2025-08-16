// components/leads/DeleteLeadDialog.tsx
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
import { useDeleteLead } from "@/hooks/leads/useDeleteLead";
import { useNavigate } from "react-router-dom";

interface Props {
  leadId: string | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteLeadDialog({ leadId, onCancel, onConfirm }: Props) {
  const { deleteLead, loading } = useDeleteLead();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!leadId) return;
    await deleteLead(leadId);
    onConfirm();
    navigate("/dashboard")
  };

  return (
    <AlertDialog open={!!leadId} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir Lead</AlertDialogTitle>
          <AlertDialogDescription>Tem certeza que deseja excluir este lead?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={loading} className="text-white bg-destructive">
            {loading ? "Excluindo..." : "Excluir"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
