import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BoxPost from '../../Components/BoxPost';
import Header from '../../Components/Header';
import Loading from '../../Components/Loading';
import SearchInput from '../../Components/SearchInput';
import Trending from '../../Components/Trending';
import FollowButton from './FollowButton';
import {
  ContainerImgNameUser,
  ContainerPosts,
  ContainerPostsAndTrending,
  ContainerTimeline,
  TittlePosts,
} from './UserTimelineStyle';

export default function UserTimeline({ config, deleteToken }) {
  const { id } = useParams();
  const [timelinePosts, setTimelinePosts] = useState('');
  const [timelineUser, setTimelineUser] = useState({});
  const [sessionId, setSessionId] = useState(0);
  const [user, setUser] = useState({});
  const [hashtags, setHashtags] = useState([]);
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
          {timelinePosts === '' ? (
            <Loading />
          ) : timelinePosts.length === 0 ? (
            'There are no posts yet'
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
        </ContainerPosts>
        {timelineUser.id !== user.id && (
          <FollowButton headers={config.headers} />
        )}
        <Trending hashtags={hashtags} />
      </ContainerPostsAndTrending>
    </ContainerTimeline>
  );
}
