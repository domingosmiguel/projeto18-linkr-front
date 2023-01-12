import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useInterval from 'use-interval';
import {
  ContainerPosts,
  ContainerPostsAndTrending,
  ContainerTimeline,
  MessageText,
  TittlePosts,
} from '../../Assets/styles';
import BoxPost from '../../Components/BoxPost';
import Header from '../../Components/Header';
import Loading from '../../Components/Loading';
import { LoadingMorePosts } from '../../Components/LoadingMorePosts';
import SearchInput from '../../Components/SearchInput';
import Trending from '../../Components/Trending';
import { NewPosts } from '../Timeline/TimelineStyle';
import FollowButton from './FollowButton';
import { ContainerImgNameUser } from './UserTimelineStyle';

export default function UserTimeline({ config, deleteToken }) {
  const { id } = useParams();
  const [timelinePosts, setTimelinePosts] = useState('');
  const [timelineUser, setTimelineUser] = useState({});
  const [sessionId, setSessionId] = useState(0);
  const [user, setUser] = useState({});
  const [hashtags, setHashtags] = useState([]);
  const loaderRef = useRef(null);
  const [newPostsNumber, setNewPostsNumber] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/user/${id}`, config)
      .then((res) => {
        setUser(res.data.user);
        res.data.timelinePosts.forEach((post, idx) => {
          res.data.timelinePosts[idx] = {
            ...post,
            username: res.data.timelineUser.username,
            pictureUrl: res.data.timelineUser.pictureUrl,
          };
        });
        setTimelinePosts(res.data.timelinePosts);
        setTimelineUser(res.data.timelineUser);
        setHashtags(res.data.hashtags);
        setSessionId(res.data.sessionId);
        setHasMore(res.data.hasMore);
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.status === 401) {
          deleteToken();
          navigate('/');
        }
        if (error.response?.status === 500) {
          alert(
            'An error occurred while trying to fetch the posts, please refresh the page'
          );
        }
      });
  }, [id]);

  useInterval(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/user/${id}/${
          timelinePosts.length
            ? timelinePosts[0].createdAt
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

  function updateTimeline() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/user/${id}`, config)
      .then((res) => {
        setTimelinePosts(res.data.posts);
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
          <ContainerImgNameUser>
            <TittlePosts>
              <img src={timelineUser.pictureUrl} alt={timelineUser.username} />
              <span>{timelineUser.username}'s posts</span>
            </TittlePosts>
          </ContainerImgNameUser>
          <NewPosts number={newPostsNumber} onClick={updateTimeline}>
            {newPostsNumber} new post{newPostsNumber > 1 && 's'}, load more!{' '}
            <ion-icon name='refresh'></ion-icon>
          </NewPosts>
          {timelinePosts === '' ? (
            <Loading />
          ) : timelinePosts.length === 0 && !newPostsNumber ? (
            <MessageText>There are no posts yet</MessageText>
          ) : (
            timelinePosts.map((post) => (
              <BoxPost
                headers={config.headers}
                user={user}
                post={post}
                key={post.id}
              />
            ))
          )}
          {timelinePosts && timelinePosts.length && hasMore ? (
            <LoadingMorePosts ref={loaderRef} />
          ) : (
            <MessageText>No more posts from your friends available</MessageText>
          )}
        </ContainerPosts>
        {timelineUser.id !== user.id && (
          <FollowButton headers={config.headers} />
        )}
        <Trending hashtags={hashtags} />
      </ContainerPostsAndTrending>
    </ContainerTimeline>
  );
}
