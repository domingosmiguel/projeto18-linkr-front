import { createContext, useState } from "react";
export const DadosContext = createContext();

export default function ContextProvider({ children }) {

    const [userName, setUserName] = useState("")
    const [userImg, setUserImg] = useState("")
    const [posts, setPosts] = useState("")
    const [linkPost, setLinkPost] = useState("")
    const [textPost, setTextPost] = useState("")

    return (
        <DadosContext.Provider value={{
            userName, setUserName,
            userImg, setUserImg,
            posts, setPosts,
            linkPost, setLinkPost,
            textPost, setTextPost
        }}>
            {children}
        </DadosContext.Provider>
    )
}