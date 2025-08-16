import { useState, useMemo } from "react";
import type { Lead } from "@/interfaces/leadData";

export function useLeadsFiltered(leads: Lead[]) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sortByScore, setSortByScore] = useState<"asc" | "desc" | null>(null);

  const filteredLeads = useMemo(() => {
    let filtered = leads;

    if (search.trim()) {
      filtered = filtered.filter((lead) =>
        `${lead.name} ${lead.company}`.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((lead) => lead.status === statusFilter);
    }

    if (sortByScore) {
      filtered = [...filtered].sort((a, b) =>
        sortByScore === "asc" ? a.score - b.score : b.score - a.score
      );
    }

    return filtered;
  }, [leads, search, statusFilter, sortByScore]);

  return {
    filteredLeads,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    sortByScore,
    setSortByScore,
  };
}
