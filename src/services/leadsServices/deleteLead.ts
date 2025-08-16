import { api } from "../api";

export async function deleteLead(id: string): Promise<void> {
  try {
    await api.delete(`/leads/${id}`);
  } catch (error) {
    console.error("Erro ao excluir lead:", error);
    throw new Error("Não foi possível excluir o lead.");
  }
}