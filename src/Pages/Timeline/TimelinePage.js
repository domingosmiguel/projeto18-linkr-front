import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BoxPost from '../../Components/BoxPost';
import Header from '../../Components/Header';
import Loading from '../../Components/Loading';
import ModalDelete from '../../Components/Modal';
import NoPosts from '../../Components/NoPosts';
import Trending from '../../Components/Trending';
import { DadosContext } from '../../context/DadosContext';
import {
  BoxInputs,
  ButtonPost,
  ContainerInputs,
  ContainerPosts,
  ContainerPostsAndTrending,
  ContainerTimeline,
  Image,
  InputLink,
  InputText,
  TittlePosts,
} from './TimelineStyle';

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
  const [hashtags, setHashtags] = useState([]);
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:4000/timeline-posts', config)
      .then((res) => {
        setUser(res.data.user);
        setSessionId(res.data.sessionId);
        setPosts(res.data.posts);
        setHashtags(res.data.hashtags);
      })
      .catch((err) => {
        console.log(err.response?.status);
        if (err.response?.status === 401) {
          localStorage.clear();
          navigate('/');
        }
        if (err.response?.status === 500) {
          alert(
            'An error occurred while trying to fetch the posts, please refresh the page'
          );
        }
      });
  }, []);

  function publishPost(event) {
    event.preventDefault();
    setDisabled(true);
    const hashtags = textPost.split(' ').filter((elem) => elem.startsWith('#'));
    const body = { texto: textPost, link: linkPost, hashtags };
    axios
      .post('http://localhost:4000/timeline-posts', body, config)
      .then((res) => {
        setDisabled(false);
        setLinkPost('');
        setTextPost('');
        atualizarTimeline();
      })
      .catch((err) => {
        console.log(err.response.status);
        alert('Houve um erro ao publicar seu link');
        setDisabled(false);
        setLinkPost('');
        setTextPost('');
        if (err.response.status === 401) {
          localStorage.clear();
          navigate('/');
        }
        if (err.response.status === 422) {
          alert('Fill in the inputs correctly');
        }
        if (err.response.status === 500) {
          alert('Internal server error');
        }
      });
  }

  function atualizarTimeline() {
      axios
          .get('http://localhost:4000/timeline-posts', config)
          .then((res) => {
              setPosts(res.data.posts);
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
                              <img src={user.pictureUrl} alt="profile" />
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
                  <ModalDelete/>
                  {posts === ''
                      ? <Loading/>
                      : posts.length === 0
                          ? "There are no posts yet"
                          : posts.map((p, idx) => <BoxPost user={user} post={p} key={idx} />)}
              </ContainerPosts>
              <Trending hashtags={hashtags} />
          </ContainerPostsAndTrending>
      </ContainerTimeline>
  );
}
