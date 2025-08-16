import type { Lead } from "@/interfaces/leadData";
import { getLeadById } from "@/services/leadsServices/getLeadByIdService";
import { useEffect, useState } from "react";

export function useLeadById(id: string) {
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchLead() {
      try {
        const data = await getLeadById(id);
        if (isMounted) setLead(data);
      } catch (err) {
        if (isMounted)
          setError(err instanceof Error ? err.message : "Erro ao buscar lead");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchLead();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { lead, loading, error };
}
