import axios from "axios";
import Header from "../../Components/Header";
import {
    ContainerTimeline,
    ContainerPostsAndTrending,
    ContainerPosts, TittlePosts, BoxInputs,
    Image, ContainerInputs, InputLink, InputText, ButtonPost
} from "./TimelineStyle";
import BoxPost from "../../Components/BoxPost";
import Trending from "../../Components/Trending";

export default function TimelinePage() {
    return (
        <ContainerTimeline>
            {/* <Header /> */}
            <ContainerPostsAndTrending>
                <ContainerPosts>
                    <TittlePosts>timeline</TittlePosts>
                    <BoxInputs>
                        <Image><img src="https://cdn.pixabay.com/photo/2015/11/16/14/43/cat-1045782__340.jpg" alt="profile" /></Image>
                        <ContainerInputs>
                            <span>What are you going to share today?</span>
                            <InputLink placeholder="http://..."></InputLink>
                            <InputText placeholder="Awesome article about #javascript"></InputText>
                            <ButtonPost>Publish</ButtonPost>
                        </ContainerInputs>
                    </BoxInputs>
                    <BoxPost />
                    <BoxPost />
                    <BoxPost />
                </ContainerPosts>
                <Trending />
            </ContainerPostsAndTrending>
        </ContainerTimeline>

    )
}