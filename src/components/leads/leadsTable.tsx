
import { useLeads } from '@/hooks/useLeads';
import { ArrowDown01 } from 'lucide-react';
import { useState } from 'react';

export default function LeadsTable() {
  const { leads, loading } = useLeads();
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = leads
    .filter((lead) =>
      `${lead.name} ${lead.company}`.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((lead) =>
      filterStatus === 'All' ? true : lead.status === filterStatus
    )
    .sort((a, b) => b.score - a.score);

  return (
    <div className="shadow rounded-md p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <input
          type="text"
          placeholder="Search by name or company"
          className="border px-3 py-2 rounded w-full sm:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border px-3 py-2 rounded w-full sm:w-1/4"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center py-4">Loading leads...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center py-4">No leads found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">Name</th>
                <th className="p-2">Company</th>
                <th className="p-2">Email</th>
                <th className="p-2">Source</th>
                <th className="p-2 flex items-center gap-1">
                  Score <ArrowDown01 className="inline" />
                </th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => (
                <tr key={lead.id} className="border-t">
                  <td className="p-2 font-medium">{lead.name}</td>
                  <td className="p-2">{lead.company}</td>
                  <td className="p-2">{lead.email}</td>
                  <td className="p-2">{lead.source}</td>
                  <td className="p-2">{lead.score}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      lead.status === 'New' ? 'bg-blue-100 text-blue-800'
                      : lead.status === 'Contacted' ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
