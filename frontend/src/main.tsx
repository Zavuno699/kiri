import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";

import { router } from "./routes/router";
import { rehydrateSession } from "./application/authentication/commands/rehydrateSession";

import "./styles.css";

// Mount the app immediately, then rehydrate session in background
// This ensures the UI renders even if rehydration fails
ReactDOM.createRoot(
  document.getElementById("root")!,
).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// Rehydrate session from backend in background
// This ensures persisted session_id is validated and roles come from authoritative backend
rehydrateSession().catch(() => {
  // Silently fail - user will remain anonymous
});
