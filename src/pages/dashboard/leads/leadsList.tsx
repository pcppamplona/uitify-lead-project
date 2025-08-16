import {
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLeads } from "@/hooks/leads/useLeads";
import type { Lead } from "@/interfaces/leadData";
import { Funnel, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SkeletonTable } from "@/components/skeletons/skeletonTable";
import LeadsFilterDialog from "./components/LeadsFilterDialog";
import { useLeadsFiltered } from "@/hooks/leads/useLeadsFiltered";

export default function LeadsList() {
  const { leads, loading, error } = useLeads();
  const navigate = useNavigate();

  const [filterOpen, setFilterOpen] = useState(false);

  const {
    filteredLeads,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    sortByScore,
    setSortByScore,
  } = useLeadsFiltered(leads);

  const handleRowClick = (lead: Lead) => {
    navigate("/leadDetails", { state: { leadId: lead.id } });
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tabular-nums">
          All Leads
          <div className="flex items-center border border-border rounded-lg px-3 py-2 mt-4">
            <Search size={16} className="mr-2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or company"
              className="outline-none text-sm w-full bg-transparent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardTitle>

        <div className="flex justify-self-end items-center space-x-4 mt-4">
          <button
            className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-purple-600"
            onClick={() => setFilterOpen(true)}
          >
            <Funnel size={16} className="mr-2" />
            Filter
          </button>
        </div>
      </CardHeader>

      <div className="w-full px-4 lg:px-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell className="font-semibold text-muted-foreground">
                Nome
              </TableCell>
              <TableCell className="font-semibold text-muted-foreground">
                Empresa
              </TableCell>
              <TableCell className="font-semibold text-muted-foreground">
                Email
              </TableCell>
              <TableCell className="font-semibold text-muted-foreground">
                Score
              </TableCell>
              <TableCell className="font-semibold text-muted-foreground">
                Status
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <SkeletonTable />
            ) : error ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-red-500">
                  {error}
                </TableCell>
              </TableRow>
            ) : filteredLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  Nenhum lead encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filteredLeads.map((lead) => (
                <TableRow
                  key={lead.id}
                  onClick={() => handleRowClick(lead)}
                  className="cursor-pointer hover:bg-muted transition"
                >
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.company}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.score}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        lead.status === "New"
                          ? "bg-blue-200 text-blue-800"
                          : lead.status === "Contacted"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <LeadsFilterDialog
        open={filterOpen}
        onOpenChange={setFilterOpen}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sortByScore={sortByScore}
        onSortChange={setSortByScore}
      />
    </>
  );
}
