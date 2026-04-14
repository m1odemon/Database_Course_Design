import React from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/Layout";
import { WorksList } from "./pages/WorksList";
import { WorkDetail } from "./pages/WorkDetail";
import { WorkForm } from "./pages/WorkForm";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, element: <Navigate to="/works" replace /> },
      { path: "works", Component: WorksList },
      { path: "works/create", Component: WorkForm },
      { path: "works/edit/:id", Component: WorkForm },
      { path: "works/:id", Component: WorkDetail },
      // Fallback
      { path: "*", element: <div className="p-20 text-center font-serif text-[var(--color-ink-light)]">书房角落落灰了... (404)</div> },
    ],
  },
]);
