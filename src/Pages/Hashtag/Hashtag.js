import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import useInterval from 'use-interval';
import { MessageText } from '../../Assets/styles';
import BoxPost from '../../Components/BoxPost';
import Header from '../../Components/Header';
import Loading from '../../Components/Loading';
import { LoadingMorePosts } from '../../Components/LoadingMorePosts';
import SearchInput from '../../Components/SearchInput';
import Trending from '../../Components/Trending';
import { NewPosts } from '../Timeline/TimelineStyle';

const ContainerTimeline = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #333333;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 0px;
  }
`;

const ContainerPostsAndTrending = styled.div`
  width: 940px;
  min-height: 100%;
  margin-top: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  @media (max-width: 974px) {
    width: 100%;
  }
`;

const ContainerPosts = styled.div`
  width: 611px;
  height: 1000px;
  position: relative;
  position: absolute;
  left: 0;
  top: 0;
  @media (max-width: 974px) {
    width: 100%;
    margin: 0 auto;
  }
`;

const TittlePosts = styled.div`
  height: 64px;
  padding: 53px 0 92px;
  font-family: 'Oswald', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 43px;
  line-height: 64px;
  color: #ffffff;

  @media (max-width: 974px) {
    padding: 75px 17px 47px;
    font-size: 33px;
    line-height: 45px;
  }
`;

export default function Hashtag({ config, deleteToken }) {
  const { hashtag } = useParams();
  const [posts, setPosts] = useState('');
  const [user, setUser] = useState({});
  const [sessionId, setSessionId] = useState(0);
  const [hashtags, setHashtags] = useState([]);
  const [newPostsNumber, setNewPostsNumber] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);
  const navigate = useNavigate();

  const baseURL = process.env.REACT_APP_BACKEND_URL;

  useInterval(() => {
    axios
      .get(
        `${baseURL}/new-hashtag-posts/${hashtag}/${
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

  function getMorePosts() {
    axios
      .get(
        `${baseURL}/hashtag/${hashtag}/${posts[posts.length - 1].createdAt}`,
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

  useEffect(() => {
    axios
      .get(`${baseURL}/hashtag/${hashtag}`, config)
      .then((res) => {
        setUser(res.data.user);
        setSessionId(res.data.sessionId);
        setPosts(res.data.posts);
        setHashtags(res.data.hashtags);
        setHasMore(res.data.hasMore);
      })
      .catch((err) => {
        console.log(err.response?.data);
        if (err.response?.status === 401) {
          deleteToken();
          navigate('/');
        }
      });
  }, []);

  useEffect(() => {
    observer();
  }, [posts]);

  function updateTimeline() {
    axios
      .get(`${baseURL}/hashtag/${hashtag}`, config)
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
            'An error occured while trying to fetch the posts, please refresh the page'
          );
        }
      });
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
          <TittlePosts>#{hashtag}</TittlePosts>
          <NewPosts number={newPostsNumber} onClick={updateTimeline}>
            {newPostsNumber} new post{newPostsNumber > 1 && 's'}, load more!{' '}
            <ion-icon name='refresh'></ion-icon>
          </NewPosts>
          {!posts ? (
            <Loading />
          ) : !posts.length && !newPostsNumber ? (
            <MessageText>No posts are available for this hashtag</MessageText>
          ) : (
            posts.map((p) => (
              <BoxPost
                headers={config.headers}
                user={user}
                post={p}
                displayedPosts={posts}
                setDisplayedPosts={setPosts}
                updateTimeline={updateTimeline}
                key={p.createdAt}
              />
            ))
          )}
          {posts.length ? (
            hasMore ? (
              <LoadingMorePosts ref={loaderRef} />
            ) : (
              <MessageText>
                No more posts for this hashtag available
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
