import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { createContext, useEffect, useState } from "react"
import auth from "../firebase.config"



export const UserContext = createContext(null)

const UsersAuth = ({children}) => {
    const [user, setUser]= useState(null);
    const [loading, setLoading] = useState(true);
    
    const userSignUp = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logOut = ()=>{
        return signOut(auth)
    }

    const userLogin = (email, password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (person)=>{
            setUser(person);
            setLoading(false)
        })
        return ()=>{
            unsubscribe()
        }
    })
    const info = {userSignUp, user, loading, userLogin, logOut}
  return (
    <UserContext.Provider value={info}>
        {children}
    </UserContext.Provider>
  )
}

export default UsersAuth