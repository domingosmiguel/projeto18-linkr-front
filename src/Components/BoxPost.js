import axios from 'axios';
import 'linkify-plugin-hashtag';
import Linkify from 'linkify-react';
import { useContext, useEffect, useRef, useState } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineComment } from 'react-icons/ai';
import { HiPencilAlt, HiTrash } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import styled from 'styled-components';
import { DadosContext } from '../context/DadosContext';
import BoxComments from './BoxComments';

export default function BoxPost({ post, user }) {
  const { setIsOpen, setId, setPosts, setHashtags } = useContext(DadosContext);
  const inputRef = useRef(null);
  const [editing, setEditing] = useState(false);
  const [idEdition, setIdEdition] = useState('');
  const [textEdited, setTextEdited] = useState(post.txt);
  const [disabledEdition, setDisabledEdition] = useState(false);
  const [comments, setComments] = useState(false);
  const [commentId, setCommentId] = useState("");

  const regex = new RegExp('https?://(www.)?[^/]*?/?([^$]*?$)?');

  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };
  const navigate = useNavigate();

  const [postLikes, setPostLikes] = useState({
    count: 0,
    users: [],
    liked: false,
  });
  function makeEdition(id) {
    setEditing(!editing);
    setIdEdition(id);
  }

  const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  useEffect(()=>{
    if (comments) {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/post-comment/${post.id}`, config)
      .then((res)=>{
        console.log(res.data);
        setCommentId(res.data)
      })
      .catch((err)=>{
        console.log(err.response)
      })
    }
  },
  [comments])

  useEffect(() => {
    (async () => {
      try {
        const { data: likeInfo } = await axios.request({
          baseURL: process.env.REACT_APP_BACKEND_URL,
          url: `/${post.id}/likes`,
          headers,
        });
        setPostLikes(likeInfo);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [postLikes.liked]);

  const options = {
    formatHref: {
      hashtag: (href) => '/hashtag/' + href.substr(1),
    },
  };

  function editionPostText(event, id) {
    if (event.key === 'Escape') {
      setEditing(false);
    } else if (event.key === 'Enter') {
      setDisabledEdition(true);

      const hashtags = textEdited
        .split(' ')
        .filter((elem) => elem.startsWith('#'));
      const body = { texto: textEdited, hashtags };
      axios
        .patch(
          `${process.env.REACT_APP_BACKEND_URL}/post-edition/${id}`,
          body,
          config
        )
        .then((res) => {
          setDisabledEdition(true);
          updateTimeline();
        })
        .catch((err) => {
          setDisabledEdition(false);
          if (err.response.status === 500) {
            alert('internal server error');
          }
          if (err.response.status === 401) {
            alert('Não foi possível atualizar o post');
          }
        });
    }
  }

  function updateTimeline() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/timeline-posts`, config)
      .then((response) => {
        setPosts(response.data.posts);
        setHashtags(response.data.hashtags);
        setDisabledEdition(false);
        setEditing(false);
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status === 401) {
          localStorage.clear();
          navigate('/');
        }
        if (error.response.status === 500) {
          alert(
            'An error occurred while trying to fetch the posts, please refresh the page'
          );
        }
      });
  }

  function openModal(postId) {
    setId(postId);
    setIsOpen(true);
  }

  const tooltipTxt = () => {
    let txt = '';
    if (postLikes.count) {
      if (postLikes.liked) {
        txt = 'You';
        if (postLikes.users.length === 2 && postLikes.count >= 2) {
          txt += `, ${postLikes.users[0]} and other ${postLikes.count - 2 > 1
              ? `${postLikes.count - 2} people`
              : '1 person'
            }`;
        } else if (postLikes.users.length === 1) {
          txt += ` and ${postLikes.users[0]}`;
        }
      } else if (postLikes.users.length === 1) {
        txt += postLikes.users[0];
      } else if (postLikes.users.length === 2 && postLikes.count > 2) {
        txt += `${postLikes.users[0]}, ${postLikes.users[1]} and other ${postLikes.count - 2 > 1 ? `${postLikes.count - 2} people` : '1 person'
          }`;
      } else {
        txt += `${postLikes.users[0]} and ${postLikes.users[1]}`;
      }
    } else {
      txt += 'No likes yet';
    }
    return txt;
  };

  const like = async () => {
    try {
      await axios.request({
        baseURL: process.env.REACT_APP_BACKEND_URL,
        url: `/${post.id}/userLike`,
        method: 'post',
        headers,
      });
      setPostLikes({ ...postLikes, liked: true });
    } catch (error) {
      console.log(error);
    }
  };

  const dislike = async () => {
    try {
      await axios.request({
        baseURL: process.env.REACT_APP_BACKEND_URL,
        url: `/${post.id}/userLike`,
        method: 'delete',
        headers,
      });
      setPostLikes({ ...postLikes, liked: false });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ContainerBoxPost>
    <Post>
      <ImageProfile>
        <img src={post.pictureUrl} alt='profile' />
        <div>
          {postLikes.liked ? (
            <AiFillHeart style={{ color: 'red' }} onClick={dislike} />
          ) : (
            <AiOutlineHeart onClick={like} />
          )}
          <p id={`post-likes-info-${post.id}`}>
            {postLikes.count} Like{postLikes.count !== 1 && 's'}
          </p>
          <TooltipEdit
            variant='light'
            place='bottom'
            anchorId={`post-likes-info-${post.id}`}
            content={tooltipTxt()}
          />
        </div>
        <div>
          <AiOutlineComment onClick={()=> setComments(!comments)}/>
          <p>0 comments</p>
        </div>
      </ImageProfile>
      <PostContent>
        <BoxNameIcons>
          <Link to={`/user/${post.userId}`}>
            <span>{post.username}</span>
          </Link>
          {user.id === post.userId && (
            <BoxIcons>
              <HiPencilAlt onClick={() => makeEdition(post.id)} />
              <HiTrash onClick={() => openModal(post.id)} />
            </BoxIcons>
          )}
        </BoxNameIcons>
        {idEdition === post.id ? (
          editing === true ? (
            <InputEdition
              ref={inputRef}
              disabled={disabledEdition}
              onChange={(e) => setTextEdited(e.target.value)}
              value={textEdited}
              type='text'
              onKeyUp={(event) => editionPostText(event, post.id)}
            />
          ) : (
            <Text>
              <Linkify options={options}>{post.txt}</Linkify>
            </Text>
          )
        ) : (
          <Text>
            <Linkify options={options}>{post.txt}</Linkify>
          </Text>
        )}
        <Url onClick={() => window.open(post.link)}>
          <Data>
            <h1>{post.title}</h1>
            <h2>{post.description}</h2>
            <h3>{post.link}</h3>
          </Data>
          {regex.test(post.image) ? <img src={post.image} alt='link' /> : <></>}
        </Url>
      </PostContent>
    </Post>
    <BoxComments 
      open={comments} 
      postId={post.id} 
      commentId={commentId}
      setCommentId={setCommentId}/>
    </ContainerBoxPost>
  );
}

const ContainerBoxPost = styled.div`
  width: 611px;
  /* background-color: blanchedalmond; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  margin-top: 15px;
  position: relative;

  @media (max-width: 974px) {
    width: 100%;
    border-radius: 0;
  }
`
const TooltipEdit = styled(Tooltip)`
  z-index: 2;
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 11px;
  line-height: 13px;
`;
const Post = styled.div`
  box-sizing: border-box;
  padding: 18px 18px;
  width: 611px;
  /* left: 241px;
  top: 470px;
  margin-bottom: 16px; */
  background: #171717;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;

  a {
    text-decoration: none;
  }

  @media (max-width: 974px) {
    width: 100%;
    border-radius: 0;
    padding: 15px;
  }
`;
const ImageProfile = styled.div`
  width: 60px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
  & > div {
    height: 40px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    svg {
      color: #ffffff;
      font-size: 20px;
      cursor: pointer;
    }
    @media (max-width: 974px) {
      width: 60%;
      height: 60px;
    }
  }
  p {
    cursor: default;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    text-align: center;
    color: #ffffff;
  }

  @media (max-width: 974px) {
    width: 20%;
  }
`;
const PostContent = styled.div`
  width: 510px;
  height: 100%;
  box-sizing: border-box;
  gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  @media (max-width: 974px) {
    width: 80%;
  }
`;
const Text = styled.div`
  border-radius: 16px;

  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
  color: #b7b7b7;
  a {
    text-decoration: none;
    color: white;
  }

  @media (max-width: 974px) {
    width: 98%;
  }
`;
const Url = styled.div`
  width: 503px;
  border: 1px solid #333333;
  border-radius: 14px;
  display: flex;
  justify-content: space-between;
  img {
    width: 155px;
    height: auto;
    object-fit: cover;
    border-bottom-right-radius: 13px;
    border-top-right-radius: 13px;
  }
  :hover {
    cursor: pointer;
  }
  @media (max-width: 974px) {
    width: 98%;
  }
`;
const Data = styled.div`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  box-sizing: border-box;
  padding: 24px 20px 24px 28px;
  h1 {
    font-size: 16px;
    color: #cecece;
    margin-bottom: 6px;
  }
  h2 {
    font-size: 11px;
    color: #9b9595;
    margin-bottom: 12px;
  }
  h3 {
    font-size: 11px;
    color: #cecece;
  }
`;
const BoxNameIcons = styled.div`
  width: 502px;
  height: 23px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    width: 50%;
    height: 23px;
    left: 327px;
    top: 489px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #ffffff;
    cursor: pointer;
  }
  @media (max-width: 974px) {
    width: 98%;
  }
`;
const BoxIcons = styled.div`
  width: 30%;
  height: 23px;
  display: flex;
  justify-content: right;
  svg {
    font-size: 20px;
    color: #ffffff;
    margin-left: 10px;
    cursor: pointer;
  }
`;
const InputEdition = styled.input`
  width: 97%;
  height: 40px;
  &:disabled {
    background-color: #b7b7b7;
    color: #464141;
    cursor: not-allowed;
  }
`;
