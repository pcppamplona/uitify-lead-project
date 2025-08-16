
import { Route, Routes } from "react-router";
import Dashboard from "../pages/dashboard";
import Login from "@/pages/login";
import Leads from "@/pages/dashboard/leads";
import LeadDetails from "@/pages/dashboard/leads/leadDetails";

export default function RoutesApp() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/leads" element={<Leads />} />
      <Route path="/leadDetails" element={<LeadDetails />} />
    </Routes>
  );
}
