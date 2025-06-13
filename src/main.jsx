import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DetalhesProdutos from "./pages/DetalhesProdutos.jsx";
import ShoppingCart from "./pages/ShoppingCart.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Detalhes",
    element: <DetalhesProdutos />,
  },
  {
    path:"/ShoppingCart",
    element: <ShoppingCart />,
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
