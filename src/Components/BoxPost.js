import axios from 'axios';
import 'linkify-plugin-hashtag';
import Linkify from 'linkify-react';
import { useContext, useEffect, useRef, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { HiPencilAlt, HiTrash } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { ReactTinyLink } from 'react-tiny-link';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import styled from 'styled-components';
import { DadosContext } from '../context/DadosContext';

export default function BoxPost({ post, user }) {
  const { setIsOpen, setId } = useContext(DadosContext);
  const inputRef = useRef(null);
  const [editing, setEditing] = useState(false);
  const [idEdition, setIdEdition] = useState('');
  const [textEdited, setTextEdited] = useState(post.txt);
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
          txt += `, ${postLikes.users[0]} and other ${
            postLikes.count - 2 > 1
              ? `${postLikes.count - 2} people`
              : '1 person'
          }`;
        } else if (postLikes.users.length === 1) {
          txt += ` and ${postLikes.users[0]}`;
        }
      } else if (postLikes.users.length === 1) {
        txt += postLikes.users[0];
      } else if (postLikes.users.length === 2 && postLikes.count > 2) {
        txt += `${postLikes.users[0]}, ${postLikes.users[1]} and other ${
          postLikes.count - 2 > 1 ? `${postLikes.count - 2} people` : '1 person'
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
            anchorId={`post-likes-info-${post.id}`}
            content={tooltipTxt()}
          />
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
              // disabled={disabled}
              // placeholder="Talk about your link"
              onChange={(e) => setTextEdited(e.target.value)}
              value={textEdited}
              type='text'
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
        <Url>
          <ReactTinyLink
            cardSize='small'
            showGraphic={true}
            maxLine={2}
            minLine={1}
            url={post.link}
          />
        </Url>
      </PostContent>
    </Post>
  );
}

const TooltipEdit = styled(Tooltip)`
  z-index: 2;
`;

const Post = styled.div`
  box-sizing: border-box;
  padding: 18px 18px;
  width: 611px;
  left: 241px;
  top: 470px;
  margin-bottom: 16px;
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
  }
`;

const ImageProfile = styled.div`
  width: 50px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
  div {
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
  }
  p {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    text-align: center;
    color: #ffffff;
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
`;
const Url = styled.div`
  width: 503px;
  border: 1px solid #4d4d4d;
  border-radius: 14px;

  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #cecece;
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
`;
