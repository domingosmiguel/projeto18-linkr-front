import { createContext, useState } from "react";
export const DadosContext = createContext();

export default function ContextProvider({ children }) {

    const [userName, setUserName] = useState("")
    const [userImg, setUserImg] = useState("")
    const [posts, setPosts] = useState("")

    return (
        <DadosContext.Provider value={{
            userName, setUserName,
            userImg, setUserImg,
            posts, setPosts
        }}>
            {children}
        </DadosContext.Provider>
    )
}