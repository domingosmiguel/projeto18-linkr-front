import axios from "axios";
import Header from "../../Components/Header";
import { useEffect, useContext } from "react";
import { DadosContext } from "../../context/DadosContext";
import {
    ContainerTimeline,
    ContainerPostsAndTrending,
    ContainerPosts, TittlePosts, BoxInputs,
    Image, ContainerInputs, InputLink, InputText, ButtonPost
} from "./TimelineStyle";
import BoxPost from "../../Components/BoxPost";
import Trending from "../../Components/Trending";

export default function TimelinePage() {
    const { posts, setPosts,  linkPost, setLinkPost, textPost, setTextPost } = useContext(DadosContext);

    useEffect(() => {
        // const config = {
        //     headers: {
        //         "Authorization": `Bearer ${token}`
        //     }
        // }

        axios.get("http://localhost:4000/timeline-posts")
            .then((res) => {
                setPosts(res.data);
            })
            .catch((err) => {
                console.log(err.response.data)
            })
    }, [])

    function publishPost(event){
        event.preventDefault()
        // const config = {
        //     headers: {
        //         "Authorization": `Bearer ${token}`
        //     }
        // }

        const body = {texto: textPost, link: linkPost}

        axios.post("http://localhost:4000/timeline-posts", body)
        .then((res)=>{
            console.log(res.data)
            atualizarTimeline()
        })
        .catch((err)=>{
            console.log(err.response.data)
        })
    }

    function atualizarTimeline(){
        axios.get("http://localhost:4000/timeline-posts")
        .then((res) => {
            setPosts(res.data);
        })
        .catch((err) => {
            console.log(err.response.data)
        })
    }

    return (
        <ContainerTimeline>
            <Header />
            <ContainerPostsAndTrending>
                <ContainerPosts>
                    <TittlePosts>timeline</TittlePosts>
                    <form onSubmit={publishPost}>
                        <BoxInputs>
                            <Image><img src="https://cdn.pixabay.com/photo/2015/11/16/14/43/cat-1045782__340.jpg" alt="profile" /></Image>
                            <ContainerInputs>
                                <span>What are you going to share today?</span>
                                <InputLink
                                    placeholder="http://..."
                                    onChange={e => setLinkPost(e.target.value)}
                                    value={linkPost}
                                    type="url"
                                    required />
                                <InputText
                                    placeholder="Talk about your link"
                                    onChange={e => setTextPost(e.target.value)}
                                    value={textPost}
                                    type="text" />
                                <ButtonPost type="submit">Publish</ButtonPost>
                            </ContainerInputs>
                        </BoxInputs>
                    </form>
                    {posts === "" ? "Carregando" :
                        posts.length === 0 ? "There are no posts yet" : posts.map((p) => <BoxPost post={p} />)}
                </ContainerPosts>
                <Trending />
            </ContainerPostsAndTrending>
        </ContainerTimeline>

    )
}