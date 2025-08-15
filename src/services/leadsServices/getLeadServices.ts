import type { Lead } from "@/interfaces/leadData";
import { api } from "../api";

export async function getLeads(): Promise<Lead[]> {
  try {
    const response = await api.get<Lead[]>("/leads");
    return response.data;
    
  } catch (error) {
    console.error("Erro ao buscar leads:", error);
    throw new Error("Não foi possível buscar os leads.");
  }
}
