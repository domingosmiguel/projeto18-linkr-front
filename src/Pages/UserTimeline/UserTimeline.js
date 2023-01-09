import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BoxPost from '../../Components/BoxPost';
import Header from '../../Components/Header';
import Loading from '../../Components/Loading';
import Trending from '../../Components/Trending';
import {
  ContainerImgNameUser,
  ContainerPosts,
  ContainerPostsAndTrending,
  ContainerTimeline,
  TittlePosts,
} from './UserTimelineStyle';

export default function UserTimeline() {
  const { id } = useParams();
  const [timelinePosts, setTimelinePosts] = useState([]);
  const [timelineUser, setTimelineUser] = useState({});
  const [sessionId, setSessionId] = useState(0);
  const [user, setUser] = useState({});
  const [hashtags, setHashtags] = useState([]);
  console.log({ user, timelineUser, timelinePosts, hashtags, sessionId });
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/user/${id}`, config)
      .then((res) => {
        setUser(res.data.user);
        res.data.timelineData.posts.forEach((post, idx) => {
          res.data.timelineData.posts[idx] = {
            ...post,
            username: res.data.timelineData.username,
            pictureUrl: res.data.timelineData.pictureUrl,
          };
        });
        setTimelinePosts([...res.data.timelineData.posts]);
        delete res.data.timelineData.posts;
        setTimelineUser(res.data.timelineData);
        setHashtags(res.data.hashtags);
        setSessionId(res.data.sessionId);
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.status === 401) {
          localStorage.clear();
          navigate('/');
        }
        if (error.response?.status === 500) {
          alert(
            'An error occurred while trying to fetch the posts, please refresh the page'
          );
        }
      });
  }, []);

  return (
    <ContainerTimeline>
      <Header user={user} sessionId={sessionId} />
      <ContainerPostsAndTrending>
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
              <BoxPost user={user} post={post} key={post.id} />
            ))
          )}
        </ContainerPosts>
        <Trending hashtags={hashtags} />
      </ContainerPostsAndTrending>
    </ContainerTimeline>
  );
}
