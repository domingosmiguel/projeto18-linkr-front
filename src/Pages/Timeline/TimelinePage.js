import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useInterval from 'use-interval';
import BoxPost from '../../Components/BoxPost';
import Header from '../../Components/Header';
import Loading from '../../Components/Loading';
import ModalDelete from '../../Components/Modal';
import SearchInput from '../../Components/SearchInput';
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
  NewPosts,
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
    hashtags,
    setHashtags,
  } = useContext(DadosContext);
  console.log('🚀 ~ file: TimelinePage.js:36 ~ TimelinePage ~ posts', posts);
  const [user, setUser] = useState({});
  const [sessionId, setSessionId] = useState(0);
  const [following, setFollowing] = useState([]);
  const [newPostsNumber, setNewPostsNumber] = useState(0);
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/timeline-posts`, config)
      .then((res) => {
        setUser(res.data.user);
        setSessionId(res.data.sessionId);
        setPosts(res.data.posts);
        setFollowing(res.data.following);
        setHashtags(res.data.hashtags);
      })
      .catch((err) => {
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

  useInterval(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/new-posts/${
          posts.length ? posts[0].id : 0
        }`,
        config
      )
      .then((response) => {
        if (response.data) setNewPostsNumber(response.data);
      })
      .catch((error) => {
        alert(
          'An error occurred while trying to get the number of new posts, please try refreshing the page'
        );
      });
  }, 15000);

  function publishPost(event) {
    event.preventDefault();
    setDisabled(true);
    const hashtags = textPost.split(' ').filter((elem) => elem.startsWith('#'));
    const body = { texto: textPost, link: linkPost, hashtags };
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/timeline-posts`, body, config)
      .then((res) => {
        setDisabled(false);
        setLinkPost('');
        setTextPost('');
        updateTimeline();
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
        if (err.response.status === 400) {
          alert('You must insert a valid url!');
        }
        if (err.response.status === 422) {
          alert('Fill in the inputs correctly');
        }
        if (err.response.status === 500) {
          alert('Internal server error');
        }
      });
  }

  function updateTimeline() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/timeline-posts`, config)
      .then((res) => {
        setPosts(res.data.posts);
        setHashtags(res.data.hashtags);
        setNewPostsNumber(0);
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err.response.status === 401) {
          localStorage.clear();
          navigate('/');
        }
        if (err.response.status === 500) {
          alert(
            'An error occured while trying to fetch the posts, please refresh the page'
          );
        }
      });
  }

  return (
    <ContainerTimeline>
      <Header user={user} sessionId={sessionId} />
      <ContainerPostsAndTrending>
        <SearchInput headers={config.headers} />
        <ContainerPosts>
          <TittlePosts>timeline</TittlePosts>
          <form onSubmit={publishPost}>
            <BoxInputs>
              <Image>
                <img src={user.pictureUrl} alt={user.username} />
              </Image>
              <ContainerInputs>
                <span>What are you going to share today?</span>
                <InputLink
                  disabled={disabled}
                  placeholder='http://...'
                  onChange={(e) => setLinkPost(e.target.value)}
                  value={linkPost}
                  type='url'
                  required
                />
                <InputText
                  disabled={disabled}
                  placeholder='Talk about your link'
                  onChange={(e) => setTextPost(e.target.value)}
                  value={textPost}
                  type='text'
                />
                <ButtonPost type='submit' disabled={disabled}>
                  {disabled === false ? 'Publish' : 'Publishing'}
                </ButtonPost>
              </ContainerInputs>
            </BoxInputs>
          </form>
          <ModalDelete />
          <NewPosts number={newPostsNumber} onClick={updateTimeline}>
            {newPostsNumber} new posts, load more!{' '}
            <ion-icon name='refresh'></ion-icon>
          </NewPosts>
          {posts === '' ? (
            <Loading />
          ) : posts.length === 0 ? (
            following.length === 0 ? (
              "You don't follow anyone yet. Search for new friends!"
            ) : (
              'No posts found from your friends'
            )
          ) : (
            posts.map((p, idx) => <BoxPost user={user} post={p} key={idx} />)
          )}
        </ContainerPosts>
        <Trending hashtags={hashtags} />
      </ContainerPostsAndTrending>
    </ContainerTimeline>
  );
}
