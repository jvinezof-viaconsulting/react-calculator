import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "./styles/main.css";
import "./styles/keyboard-shortcuts.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main className="container">
      <App />
    </main>
  </StrictMode>
);
