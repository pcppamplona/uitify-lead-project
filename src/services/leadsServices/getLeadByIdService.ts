import type { Lead } from "@/interfaces/leadData";
import { api } from "../api";

export async function getLeadById(id: string): Promise<Lead> {
  try {
    const response = await api.get<Lead>(`/leads/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar lead por ID:", error);
    throw new Error("Não foi possível carregar o lead.");
  }
}
