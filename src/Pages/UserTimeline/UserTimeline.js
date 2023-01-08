import {
    ContainerTimeline,
    ContainerPostsAndTrending,
    ContainerPosts,
    TittlePosts,
    ContainerImgNameUser
} from "./UserTimelineStyle"
import Header from "../../Components/Header"
import BoxPost from "../../Components/BoxPost"
import Loading from "../../Components/Loading"
import Trending from "../../Components/Trending"
import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

export default function UserTimeline() {
    const {id} = useParams()
    const [postsUser, setPostsUser] = useState("")
    const [user, setUser] =  useState("")
    const [sessionId, setSessionId] = useState(0);
    const [hashtags, setHashtags] = useState([]);
    const config = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    };
    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get(`ROTA/${id}`, config)
            .then((res) => {
                setUser(res.data.user);
                setPostsUser(res.data.posts);
                setSessionId(res.data.sessionId);
                setHashtags(res.data.hashtags);
            })
            .catch((err) => {
                console.log(err.response.status);
                if (err.response.status === 401) {
                    localStorage.clear();
                    navigate('/');
                }
                if (err.response.status === 500) {
                    alert("An error occured while trying to fetch the posts, please refresh the page");
                }
            });
    }, []);


    return (
        <ContainerTimeline>
           <Header user={user} sessionId={sessionId} />
            <ContainerPostsAndTrending>
                <ContainerPosts>
                    <ContainerImgNameUser>
                        <TittlePosts><img src="https://cdn.maioresemelhores.com/imagens/mm-gatos-1-cke.jpg"
                            alt="profile" /><span>USER NAME HERE</span></TittlePosts>
                    </ContainerImgNameUser>
                    {postsUser === ''
                    ? <Loading />
                    : postsUser.length === 0
                        ? "There are no posts yet"
                        : postsUser.map((p, idx) => <BoxPost user={user} post={p} key={idx} />)}
                </ContainerPosts>
                          <Trending hashtags={hashtags} />
            </ContainerPostsAndTrending>
        </ContainerTimeline>
    )
}