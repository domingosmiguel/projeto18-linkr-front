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
    const { posts, setPosts } = useContext(DadosContext);

    useEffect(() => {
        axios.get("http://localhost:4000/timeline-posts")
            .then((res) => {
                setPosts(res.data);
            })
            .catch((err) => {
                console.log(err.response.data)
            })
    }, [])

    return (
        <ContainerTimeline>
            <Header />
            <ContainerPostsAndTrending>
                <ContainerPosts>
                    <TittlePosts>timeline</TittlePosts>
                    <BoxInputs>
                        <Image><img src="https://cdn.pixabay.com/photo/2015/11/16/14/43/cat-1045782__340.jpg" alt="profile" /></Image>
                        <ContainerInputs>
                            <span>What are you going to share today?</span>
                            <InputLink
                                placeholder="http://..." />
                            <InputText
                                placeholder="Awesome article about #javascript" />
                            <ButtonPost>Publish</ButtonPost>
                        </ContainerInputs>
                    </BoxInputs>
                    {posts === "" ? "Carregando" : posts.map((p) => <BoxPost post={p} />)}
                </ContainerPosts>
                <Trending />
            </ContainerPostsAndTrending>
        </ContainerTimeline>

    )
}