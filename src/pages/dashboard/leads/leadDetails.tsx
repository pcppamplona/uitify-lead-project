import { useLocation, useNavigate } from "react-router-dom";
import { useLeadById } from "@/hooks/leads/useLeadById";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SidebarLayout } from "@/components/layout/SidebarLayout";

export default function LeadDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const leadId = state?.leadId;

  const { lead, loading, error } = useLeadById(leadId);

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
      current={
        <>
          Detalhes de <strong>{lead.name}</strong>
        </>
      }
    >
      <Button variant="link" onClick={() => navigate(-1)}>
        ← Voltar para lista
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{lead.name}</CardTitle>
          <CardDescription>
            Empresa: <span className="font-medium">{lead.company}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <span className="font-medium">Email:</span>{" "}
            <span>{lead.email}</span>
          </div>

          <div>
            <span className="font-medium">Fonte:</span>{" "}
            <span>{lead.source}</span>
          </div>

          <div>
            <span className="font-medium">Score:</span>{" "}
            <span className="text-blue-600 font-bold">{lead.score}</span>
          </div>

          <div>
            <span className="font-medium">Status:</span>{" "}
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
    </SidebarLayout>
  );
}
