import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";

import NotFoundError from "./pages/NotFoundError";
import Users from "./pages/Users";
import Posts from "./pages/Posts";
import Albums from "./pages/Albums";
import Todos from "./pages/Todos";

import MainLayout from "./layout/MainLayout";
import { UserProvider } from "./context/UserContext";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Users />,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/posts",
        element: <Posts />,
      },
      {
        path: "/my-posts",
        element: <Posts />,
      },
      {
        path: "/albums",
        element: <Albums />,
      },
      {
        path: "/photos",
        element: <div>Photos</div>,
      },

      {
        path: "/todos",
        element: <Todos />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundError />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>,
);
