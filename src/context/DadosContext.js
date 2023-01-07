import { createContext, useState } from "react";
export const DadosContext = createContext();

export default function ContextProvider({ children }) {

    const [userName, setUserName] = useState("")
    const [userImg, setUserImg] = useState("")
    const [posts, setPosts] = useState("")
    const [linkPost, setLinkPost] = useState("")
    const [textPost, setTextPost] = useState("")
    const [disabled, setDisabled] = useState(false)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [id, setId] = useState("");
    const [visible, setVisible ] = useState(false)
    const [disabledModal, setDisabledModal] = useState(false)

    return (
        <DadosContext.Provider value={{
            userName, setUserName,
            userImg, setUserImg,
            posts, setPosts,
            linkPost, setLinkPost,
            textPost, setTextPost,
            disabled, setDisabled,
            modalIsOpen, setIsOpen,
            id, setId,
            visible, setVisible,
            disabledModal, setDisabledModal 
        }}>
            {children}
        </DadosContext.Provider>
    )
}