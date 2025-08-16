import { useState } from "react";
import type { Lead } from "@/interfaces/leadData";
import { createOpportunityFromLead } from "@/services/opportunities/createOpportunity";

export function useCreateOpportunity() {
  const [loading, setLoading] = useState(false);

  async function mutate(lead: Lead) {
    setLoading(true);
    try {
      return await createOpportunityFromLead(lead);
    } finally {
      setLoading(false);
    }
  }

  return { createOpportunity: mutate, loading };
}
