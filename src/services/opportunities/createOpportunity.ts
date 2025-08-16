import type { Lead } from "@/interfaces/leadData";
import { api } from "../api";
import type { Opportunity } from "@/interfaces/opportunityData";

export async function createOpportunityFromLead(lead: Lead): Promise<Opportunity> {
  try {
    const response = await api.post<Opportunity>(`/opportunities`, {
      name: lead.name,
      leadId: lead.id,
      stage: "New",
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar oportunidade:", error);
    throw new Error("Não foi possível criar a oportunidade.");
  }
}
