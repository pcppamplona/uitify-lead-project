import { useLocation, useNavigate } from "react-router-dom";
import { useLeadById } from "@/hooks/leads/useLeadById";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { Pencil, Trash2, ArrowLeft, ArrowRightCircle, User, Component } from "lucide-react";
import { useState } from "react";

import EditLeadDialog from "./components/EditLeadModal";
import DeleteLeadDialog from "./components/DeleteLeadDialog";
import ConvertLeadDialog from "./components/ConvertLeadDialog";
import { Info } from "@/components/ui/info";

export default function LeadDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const leadId = state?.leadId;

  const { lead, loading, error } = useLeadById(leadId);

  const [leadToEdit, setLeadToEdit] = useState<typeof lead | null>(null);
  const [leadToConvert, setLeadToConvert] = useState<typeof lead | null>(null);
  const [leadToDelete, setLeadToDelete] = useState<string | null>(null);

  if (!leadId) {
    return (
      <div className="p-6">
        <p className="text-red-500">ID do lead não encontrado.</p>
        <Button variant="link" onClick={() => navigate(-1)}>
          Voltar
        </Button>
      </div>
    );
  }

  if (loading) {
    return <div className="p-6 text-sm">Carregando lead...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  if (!lead) {
    return (
      <div className="p-6 text-muted-foreground">Lead não encontrado.</div>
    );
  }

  return (
    <SidebarLayout
      breadcrumb={[
        { label: "Dashboard", href: "/leads" },
        { label: "Leads", href: "/leads" },
      ]}
      current={`Detalhes de ${lead.name}`}
    >
      <div className="mb-4">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-1 h-4 w-4" />
          Voltar
        </Button>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex flex-row items-center gap-2">
                <User /> Dados Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Info label="Name" value={lead?.name} />
              <Info label="Company" value={lead?.company} />
              <Info label="E-mail" value={lead?.email} />
              <Info label="Source" value={lead?.source} />
              <Info label="Score" value={lead?.score} />
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge
                  variant={
                    lead.status === "New"
                      ? "default"
                      : lead.status === "Contacted"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {lead.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex flex-row items-center gap-2">
                <Component /> Ações
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-1 gap-4">
              <Button
                size="sm"
                className="w-full  max-w-[250px] flex items-center justify-center gap-2 bg-sidebar-ring text-white"
                onClick={() => setLeadToEdit(lead)}
              >
                <Pencil className="h-4 w-4" />
                Editar Lead
              </Button>

              <Button
                size="sm"
                variant="default"
                className="w-full  max-w-[250px] flex items-center justify-center gap-2 text-white"
                onClick={() => setLeadToConvert(lead)}
              >
                <ArrowRightCircle className="h-4 w-4" />
                Converter em Oportunidade
              </Button>

              <Button
                size="sm"
                variant="destructive"
                className="w-full  max-w-[250px] flex items-center justify-center gap-2"
                onClick={() => setLeadToDelete(lead.id)}
              >
                <Trash2 className="h-4 w-4" />
                Excluir Lead
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modais */}
      <EditLeadDialog
        lead={leadToEdit}
        onCancel={() => setLeadToEdit(null)}
        onConfirm={() => setLeadToEdit(null)}
      />

      <DeleteLeadDialog
        leadId={leadToDelete}
        onCancel={() => setLeadToDelete(null)}
        onConfirm={() => setLeadToDelete(null)}
      />

      <ConvertLeadDialog
        lead={leadToConvert}
        onCancel={() => setLeadToConvert(null)}
        onConfirm={() => setLeadToConvert(null)}
      />
    </SidebarLayout>
  );
}
