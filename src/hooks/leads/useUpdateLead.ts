import { useState } from "react";
import type { Lead } from "@/interfaces/leadData";
import { updateLead } from "@/services/leadsServices/updateLead";

export function useUpdateLead() {
  const [loading, setLoading] = useState(false);

  async function mutate(id: string, data: Partial<Lead>) {
    setLoading(true);
    try {
      return await updateLead(id, data);
    } finally {
      setLoading(false);
    }
  }

  return { updateLead: mutate, loading };
}
