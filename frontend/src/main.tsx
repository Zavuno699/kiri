import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";

import { router } from "./routes/router";
import { rehydrateSession } from "./application/authentication/commands/rehydrateSession";

import "./styles.css";

// Rehydrate session from backend before mounting router
// This ensures persisted session_id is validated and roles come from authoritative backend
rehydrateSession().then(() => {
  ReactDOM.createRoot(
    document.getElementById("root")!,
  ).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
});
