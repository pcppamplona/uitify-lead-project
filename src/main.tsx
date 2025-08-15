import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import RoutesApp from "./routes/routerApp";
import { ThemeInitializer } from "./lib/utils";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeInitializer />
      <RoutesApp />
    </BrowserRouter>
  </StrictMode>
);
