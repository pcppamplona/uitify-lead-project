import { deleteLead } from "@/services/leadsServices/deleteLead";
import { useState } from "react";

export function useDeleteLead() {
  const [loading, setLoading] = useState(false);

  async function mutate(id: string) {
    setLoading(true);
    try {
      return await deleteLead(id);
    } finally {
      setLoading(false);
    }
  }

  return { deleteLead: mutate, loading };
}
