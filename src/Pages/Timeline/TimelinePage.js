import axios from 'axios';
import Header from '../../Components/Header';
import { useEffect, useContext, useState } from 'react';
import { DadosContext } from '../../context/DadosContext';
import {
  ContainerTimeline,
  ContainerPostsAndTrending,
  ContainerPosts,
  TittlePosts,
  BoxInputs,
  Image,
  ContainerInputs,
  InputLink,
  InputText,
  ButtonPost,
} from './TimelineStyle';
import BoxPost from '../../Components/BoxPost';
import Trending from '../../Components/Trending';

export default function TimelinePage() {
  const {
    posts,
    setPosts,
    linkPost,
    setLinkPost,
    textPost,
    setTextPost,
    disabled,
    setDisabled,
  } = useContext(DadosContext);
  const [user, setUser] = useState({});
  const [sessionId, setSessionId] = useState(0);

  // const config = {
  //     headers: {
  //         "Authorization": `Bearer ${token}`
  //     }
  // }

  useEffect(() => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    axios
      .get('http://localhost:4000/timeline-posts', config)
      .then((res) => {
        setUser(res.data.user);
        setSessionId(res.data.sessionId);
        setPosts(res.data.posts);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  function publishPost(event) {
    event.preventDefault();
    setDisabled(true);
    const body = { texto: textPost, link: linkPost };
    axios
      .post('http://localhost:4000/timeline-posts', body)
      .then((res) => {
        console.log(res.data);
        atualizarTimeline();
        setDisabled(false);
        setLinkPost('');
        setTextPost('');
      })
      .catch((err) => {
        console.log(err.response.data);
        alert('Houve um erro ao publicar seu link');
        setDisabled(false);
        setLinkPost('');
        setTextPost('');
      });
  }

  function atualizarTimeline() {
    axios
      .get('http://localhost:4000/timeline-posts')
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  return (
    <ContainerTimeline>
      <Header user={user} sessionId={sessionId} />
      <ContainerPostsAndTrending>
        <ContainerPosts>
          <TittlePosts>timeline</TittlePosts>
          <form onSubmit={publishPost}>
            <BoxInputs>
              <Image>
                <img
                  src="https://cdn.pixabay.com/photo/2015/11/16/14/43/cat-1045782__340.jpg"
                  alt="profile"
                />
              </Image>
              <ContainerInputs>
                <span>What are you going to share today?</span>
                <InputLink
                  disabled={disabled}
                  placeholder="http://..."
                  onChange={(e) => setLinkPost(e.target.value)}
                  value={linkPost}
                  type="url"
                  required
                />
                <InputText
                  disabled={disabled}
                  placeholder="Talk about your link"
                  onChange={(e) => setTextPost(e.target.value)}
                  value={textPost}
                  type="text"
                />
                <ButtonPost type="submit" disabled={disabled}>
                  {disabled === false ? 'Publish' : 'Publishing'}
                </ButtonPost>
              </ContainerInputs>
            </BoxInputs>
          </form>
          {posts === ''
            ? 'Carregando'
            : posts.length === 0
            ? 'There are no posts yet'
            : posts.map((p) => <BoxPost post={p} />)}
        </ContainerPosts>
        <Trending />
      </ContainerPostsAndTrending>
    </ContainerTimeline>
  );
}
