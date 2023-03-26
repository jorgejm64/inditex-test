//React
import React from "react";
import ReactDOM from "react-dom/client";

//Styles
import "./styles/globals.scss";

//Router
import { router } from "./router/router";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
