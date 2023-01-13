import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useInterval from 'use-interval';
import {
  ContainerInputs,
  ContainerPosts,
  ContainerPostsAndTrending,
  ContainerTimeline,
  InputLink,
  InputText,
  MessageText,
  TittlePosts,
} from '../../Assets/styles';
import BoxPost from '../../Components/BoxPost';
import Header from '../../Components/Header';
import Loading from '../../Components/Loading';
import { LoadingMorePosts } from '../../Components/LoadingMorePosts';
import SearchInput from '../../Components/SearchInput';
import Trending from '../../Components/Trending';
import { DadosContext } from '../../context/DadosContext';
import { BoxInputs, ButtonPost, Image, NewPosts } from './TimelineStyle.js';

export default function TimelinePage({ config, deleteToken }) {
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
  const [user, setUser] = useState({});
  const [sessionId, setSessionId] = useState(0);
  const [following, setFollowing] = useState([]);
  const [newPostsNumber, setNewPostsNumber] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);
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
        setHasMore(res.data.hasMore);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          deleteToken();
          navigate('/');
        }
        if (err.response?.status === 500) {
          alert(
            'An error occurred while trying to fetch the posts, please refresh the page'
          );
        }
        console.log(err);
      });
  }, []);

  useInterval(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/new-posts/${
          posts.length
            ? posts[0].createdAt
            : new Date('1970-01-01 00:00:00').toISOString()
        }`,
        config
      )
      .then((response) => {
        if (response.data.number) setNewPostsNumber(response.data.number);
      })
      .catch((error) => {
        console.log(error);
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
      .then(() => {
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
          deleteToken();
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

  useEffect(() => {
    observer();
  }, [posts]);

  function updateTimeline() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/timeline-posts`, config)
      .then((res) => {
        setPosts(res.data.posts);
        setHashtags(res.data.hashtags);
        setHasMore(res.data.hasMore);
        setNewPostsNumber(0);
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err.response.status === 401) {
          deleteToken();
          navigate('/');
        }
        if (err.response.status === 500) {
          alert(
            'An error occurred while trying to fetch the posts, please refresh the page'
          );
        }
      });
  }

  function getMorePosts() {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/timeline-posts/${
          posts[posts.length - 1].createdAt
        }`,
        config
      )
      .then((res) => {
        setPosts([...posts, ...res.data.posts]);
        setHasMore(res.data.hasMore);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          deleteToken();
          navigate('/');
        }
        if (err.response?.status === 500) {
          alert(
            'An error occurred while trying to fetch the posts, please refresh the page'
          );
        }
      });
  }

  function observer() {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entities) => {
      const target = entities[0];

      if (target.isIntersecting) {
        getMorePosts();
      }
    }, options);

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
  }

  return (
    <ContainerTimeline>
      <Header
        config={config}
        deleteToken={deleteToken}
        user={user}
        sessionId={sessionId}
      />
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
          <NewPosts number={newPostsNumber} onClick={updateTimeline}>
            {newPostsNumber} new post{newPostsNumber > 1 && 's'}, load more!{' '}
            <ion-icon name='refresh'></ion-icon>
          </NewPosts>
          {posts === '' ? (
            <Loading />
          ) : !posts.length && !newPostsNumber ? (
            <MessageText>
              {following.length === 0
                ? "You don't follow anyone yet. Search for new friends!"
                : 'No posts found from your friends'}
            </MessageText>
          ) : (
            posts.map((p) => (
              <BoxPost
                headers={config.headers}
                user={user}
                post={p}
                key={p.createdAt}
              />
            ))
          )}
          {posts.length ? (
            hasMore ? (
              <LoadingMorePosts ref={loaderRef} />
            ) : (
              <MessageText>
                No more posts from your friends available
              </MessageText>
            )
          ) : (
            <></>
          )}
        </ContainerPosts>
        <Trending hashtags={hashtags} />
      </ContainerPostsAndTrending>
    </ContainerTimeline>
  );
}
