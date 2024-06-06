import { createContext } from "react";
import { useContext,useState } from "react";

export const AuthContext = createContext(null);  //createContext is a function that creates a context object. When React renders a component that subscribes to this Context object it will read the current context value from the closest matching Provider above it in the tree.

export const useAuthContext=()=>{
    return useContext(AuthContext);  //useContext is a hook that returns the context value
}

export const AuthContextProvider = ({ children }) => {
    const [authUser,setAuthUser] = useState( JSON.parse(localStorage.getItem('chat-user')) || null);
    return (
        <AuthContext.Provider value={{authUser,setAuthUser}}>
            {children}
        </AuthContext.Provider>
    );
};