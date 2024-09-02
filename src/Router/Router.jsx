import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard"
import Login from "../Pages/Login"
import Register from "../Pages/Register"
import ProtactRout from "./ProtactRout";


const router = createBrowserRouter([
    {
        path : "/",
        element : <ProtactRout>
            <Dashboard />
        </ProtactRout>
    },
    {
        path : "/login",
        element : <Login />
    },
    {
        path : "/register",
        element : <Register />
    }
])

export default router;