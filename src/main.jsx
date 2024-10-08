
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router/Router.jsx";
import UsersAuth from "./UserAuth/UsersAuth.jsx";
import 'react-toastify/dist/ReactToastify.css';
createRoot(document.getElementById("root")).render(

    <UsersAuth>
      <RouterProvider router={router}></RouterProvider>
    </UsersAuth>
 
);
