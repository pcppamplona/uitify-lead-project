import type { Lead } from "@/interfaces/leadData";
import { getLeads } from "@/services/leadsServices/getLeadServices";
import { useEffect, useState } from "react";

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const data = await getLeads();
        if (isMounted) setLeads(data);
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err.message : "Erro ao buscar leads");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  return { leads, loading, error };
}
