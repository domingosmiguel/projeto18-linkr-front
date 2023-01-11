import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import BoxPost from '../../Components/BoxPost';
import Header from '../../Components/Header';
import Loading from '../../Components/Loading';
import SearchInput from '../../Components/SearchInput';
import Trending from '../../Components/Trending';

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
  width: 145px;
  height: 64px;
  margin-top: 53px;
  margin-bottom: 43px;
  font-family: 'Oswald', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 43px;
  line-height: 64px;
  color: #ffffff;
`;

export default function Hashtag() {
  const { hashtag } = useParams();
  const [posts, setPosts] = useState('');
  const [user, setUser] = useState({});
  const [sessionId, setSessionId] = useState(0);
  const [hashtags, setHashtags] = useState([]);
  const navigate = useNavigate();
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/hashtag/${hashtag}`, config)
      .then((res) => {
        setUser(res.data.user);
        setSessionId(res.data.sessionId);
        setPosts(res.data.posts);
        setHashtags(res.data.hashtags);
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response.status === 401) {
          localStorage.clear();
          navigate('/');
        }
      });
  }, []);

  return (
    <ContainerTimeline>
      <Header user={user} sessionId={sessionId} />
      <ContainerPostsAndTrending>
        <SearchInput headers={config.headers} />
        <ContainerPosts>
          <TittlePosts>#{hashtag}</TittlePosts>
          {posts === '' ? (
            <Loading />
          ) : posts.length === 0 ? (
            'There are no posts yet'
          ) : (
            posts.map((p, idx) => <BoxPost user={user} post={p} key={idx} />)
          )}
        </ContainerPosts>
        <Trending hashtags={hashtags} />
      </ContainerPostsAndTrending>
    </ContainerTimeline>
  );
}
