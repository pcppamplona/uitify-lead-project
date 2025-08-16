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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { Lead } from "@/interfaces/leadData";
import { useUpdateLead } from "@/hooks/leads/useUpdateLead";

interface Props {
  lead: Lead | null;
  onCancel: () => void;
  onConfirm: (updatedLead: Lead) => void;
}

export default function EditLeadDialog({ lead, onCancel, onConfirm }: Props) {
  const [form, setForm] = useState<Partial<Lead>>({});
  const { updateLead, loading } = useUpdateLead();

  useEffect(() => {
    if (lead) {
      setForm({ email: lead.email, status: lead.status });
    }
  }, [lead]);

  const handleSubmit = async () => {
    if (!lead) return;

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      alert("Email invalid");
      return;
    }

    const updatedData: Lead = { ...lead, ...form };

    const updated = await updateLead(lead.id, updatedData);
    onConfirm(updated);
  };
  return (
    <AlertDialog open={!!lead} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Editar Lead</AlertDialogTitle>
          <AlertDialogDescription>
            Atualize os dados do lead.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={form.email || ""}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <Select
            value={form.status || ""}
            onValueChange={(value) => setForm({ ...form, status: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Contacted">Contacted</SelectItem>
              <SelectItem value="Qualified">Qualified</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit} disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
