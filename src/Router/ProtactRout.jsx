import { useContext } from "react"
import { UserContext } from "../UserAuth/UsersAuth"
import { Navigate } from "react-router-dom";


const ProtactRout = ({children}) => {
    const {user, loading} = useContext(UserContext);
    if(loading){
        return <div className="h-screen flex justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    }

    if(user){
        return children
    }

    return <Navigate to='/login'></Navigate>
}

export default ProtactRout