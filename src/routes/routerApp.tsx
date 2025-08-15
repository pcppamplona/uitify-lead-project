
import { Route, Routes } from "react-router";
// import Login from "../pages/login";
import Dashboard from "../pages/dashboard";

export default function RoutesApp() {
  return (
    <Routes>
      {/* <Route index element={<Login />} /> */}
      <Route index element={<Dashboard />} />

      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
