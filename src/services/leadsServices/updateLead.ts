import type { Lead } from "@/interfaces/leadData";
import { api } from "../api";

export async function updateLead(id: string, data: Partial<Lead>): Promise<Lead> {
  try {
    const response = await api.put<Lead>(`/leads/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar lead:", error);
    throw new Error("Não foi possível atualizar o lead.");
  }
}
