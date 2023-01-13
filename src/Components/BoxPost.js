import axios from 'axios';
import 'linkify-plugin-hashtag';
import Linkify from 'linkify-react';
import { useContext, useEffect, useRef, useState } from 'react';
import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from 'react-icons/ai';
import { HiPencilAlt, HiTrash } from 'react-icons/hi';
import { MdRepeat } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import styled from 'styled-components';
import { DadosContext } from '../context/DadosContext';
import BoxComments from './BoxComments';
import Modal from './Modal';

export default function BoxPost({
  headers,
  post,
  user,
  displayedPosts,
  setDisplayedPosts,
}) {
  const { setPosts, setHashtags } = useContext(DadosContext);
  const inputRef = useRef(null);
  const [editing, setEditing] = useState(false);
  const [idEdition, setIdEdition] = useState('');
  const [textEdited, setTextEdited] = useState(post.txt);
  const [disabledEdition, setDisabledEdition] = useState(false);
  const navigate = useNavigate();
  const [comments, setComments] = useState(false);
  const [commentId, setCommentId] = useState('');
  const [qtdComment, setQtdComment] = useState('');
  const [qtdReposts, setQtdReposts] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalAction, setModalAction] = useState('');

  const regex = new RegExp('https?://(www.)?[^/]*?/?([^$]*?$)?');

  const [postLikes, setPostLikes] = useState({
    count: 0,
    users: [],
    liked: false,
  });

  const baseURL = process.env.REACT_APP_BACKEND_URL;

  function qtdComments(id) {
    axios
      .get(`${baseURL}/post-comments-all/${id}`, {
        headers,
      })
      .then((res) => {
        setQtdComment(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  function makeEdition(id) {
    setEditing(!editing);
    setIdEdition(id);
  }

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  useEffect(() => {
    if (comments) {
      axios
        .get(`${baseURL}/post-comment/${post.id}`, {
          headers,
        })
        .then((res) => {
          setCommentId(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }, [comments]);

  useEffect(() => {
    (async () => {
      try {
        const { data: likeInfo } = await axios.request({
          baseURL,
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
        .patch(`${baseURL}/post-edition/${id}`, body, { headers })
        .then(() => {
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
      .get(`${baseURL}/timeline-posts`, { headers })
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
        baseURL,
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
        baseURL,
        url: `/${post.id}/userLike`,
        method: 'delete',
        headers,
      });
      setPostLikes({ ...postLikes, liked: false });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    repostsCount();
  }, []);

  async function repostsCount() {
    try {
      const res = await axios.request({
        baseURL,
        url: `/posts/${post.id}/reposts`,
        method: 'get',
        headers,
      });
      setQtdReposts(res.data.number);
    } catch (error) {
      console.log(error);
    }
  }

  async function submitRepost() {
    setModalLoading(true);
    try {
      await axios.request({
        baseURL,
        url: `/repost/${post.id}`,
        method: 'post',
        headers,
      });
      repostsCount();
    } catch (error) {
      if (error.response?.status === 404) {
        alert('You already re-posted this post!');
      }
      console.log(error);
    } finally {
      setOpenModal(false);
    }
  }

  async function submitDelete() {
    setModalLoading(true);
    try {
      const {
        data: { createdAt },
      } = await axios.request({
        baseURL,
        url: `/user-posts/${post.id}`,
        method: 'delete',
        headers,
      });
      setDisplayedPosts([
        ...displayedPosts.filter((post) => post.createdAt !== createdAt),
      ]);
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 404) {
        alert('Unable to run task');
      }
      if (error.response.status === 500) {
        alert('internal server error');
      }
      console.log(error.response);
    } finally {
      setOpenModal(false);
    }
  }
  const handleModalAction = {
    delete: submitDelete,
    share: submitRepost,
  };

  const handleAction = (action) => {
    setModalLoading(false);
    setOpenModal(true);
    setModalAction(action);
  };
  return (
    <ContainerBoxPost repost={post.repost}>
      <Repost repost={post.repost}>
        <MdRepeat />
        <RepostText>
          <p>Re-posted by</p>
          <User onClick={() => navigate(`/user/${post.reposterId}`)}>
            {user.username === post.reposterName ? 'you' : post.reposterName}
          </User>
        </RepostText>
      </Repost>
      <Post>
        <ImageProfile repost={post.repost}>
          <img src={post.pictureUrl} alt='profile' />
          <div>
            {postLikes.liked ? (
              <AiFillHeart
                style={{ color: 'red' }}
                onClick={() => {
                  if (post.repost) return;
                  else dislike();
                }}
              />
            ) : (
              <AiOutlineHeart
                onClick={() => {
                  if (post.repost) return;
                  else like();
                }}
              />
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
            <AiOutlineComment onClick={() => setComments(!comments)} />
            <p>
              {qtdComments(post.id)}
              {qtdComment !== '' ? qtdComment : '0'} comments
            </p>
          </div>
          <div>
            <MdRepeat
              onClick={() => {
                if (post.repost) return;
                else handleAction('share');
              }}
            />
            <p>{qtdReposts} re-posts</p>
          </div>
        </ImageProfile>
        <PostContent>
          <BoxNameIcons>
            <Link to={`/user/${post.userId}`}>
              <span>{post.username}</span>
            </Link>
            {user.id === post.userId && !post.repost ? (
              <BoxIcons repost={post.repost}>
                <HiPencilAlt onClick={() => makeEdition(post.id)} />
                <HiTrash onClick={() => handleAction('delete')} />
              </BoxIcons>
            ) : (
              <></>
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
            {regex.test(post.image) ? (
              <img src={post.image} alt='link' />
            ) : (
              <></>
            )}
          </Url>
        </PostContent>
      </Post>
      <BoxComments
        open={comments}
        postId={post.id}
        commentId={commentId}
        setCommentId={setCommentId}
        user={user}
        key={commentId}
        repost={post.repost}
      />
      {openModal && (
        <Modal
          handleClick={handleModalAction}
          setOpenModal={setOpenModal}
          loading={modalLoading}
          action={modalAction}
        />
      )}
    </ContainerBoxPost>
  );
}

const ContainerBoxPost = styled.div`
  width: 611px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  margin-top: ${(props) => (props.repost ? '50px' : '15px')};
  position: relative;

  @media (max-width: 974px) {
    width: 100%;
    border-radius: 0;
  }
  @media (max-width: 498px) {
    margin-top: ${(props) => (props.repost ? '60px' : '15px')};
  }
`;
const TooltipEdit = styled(Tooltip)`
  z-index: 2;
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 11px;
  line-height: 13px;
`;
const Post = styled.div`
  z-index: 1;
  box-sizing: border-box;
  padding: 17px 21px 20px 10px;
  width: 100%;
  background: #171717;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;

  a {
    text-decoration: none;
  }

  @media (max-width: 974px) {
    max-width: 100%;
    border-radius: 0;
    padding: 15px;
    padding: 9px 18px 15px 10px;
  }
`;
const ImageProfile = styled.div`
  width: 67px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;

  @media (max-width: 974px) {
    width: 15%;
    margin-right: 9px;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
  & > div {
    min-height: 37px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    svg {
      color: #ffffff;
      font-size: 20px;
      cursor: ${(props) => (props.repost ? 'default' : 'pointer')};
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
`;
const PostContent = styled.div`
  width: 85%;
  gap: 10px;
  display: flex;
  flex-direction: column;
`;
const Text = styled.div`
  border-radius: 16px;
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
  color: #b7b7b7;
  word-wrap: break-word;
  word-break: break-all;
  a {
    text-decoration: none;
    color: white;
  }
`;
const Url = styled.div`
  width: 100%;
  border: 1px solid #333333;
  border-radius: 13px;
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
`;
const Data = styled.div`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  box-sizing: border-box;
  padding: 24px 20px 24px 28px;
  word-wrap: break-word;
  word-break: break-all;
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
  width: 100%;
  height: 23px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    width: 20%;
    height: 23px;
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
  width: 100%;
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
  height: 40px;
  &:disabled {
    background-color: #b7b7b7;
    color: #464141;
    cursor: not-allowed;
  }
`;
const Repost = styled.div`
  display: ${(props) => (props.repost ? 'flex' : 'none')};
  gap: 4px;
  height: 100%;
  width: 611px;
  color: #fff;
  background-color: #1e1e1e;
  box-sizing: border-box;
  padding: 10px 10px 0;
  border-top-left-radius: 13px;
  border-top-right-radius: 13px;
  border-bottom-left-radius: -13px;
  position: absolute;
  top: -35px;
  left: 0;
  z-index: 0;
  color: #fff;
  word-wrap: break-word;
  word-break: break-all;
  @media (max-width: 974px) {
    width: 100%;
  }
  @media (max-width: 498px) {
    top: -45px;
  }
`;

const RepostText = styled.div`
  display: flex;
  gap: 5px;
  color: #b7b7b7;
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
`;

const User = styled.p`
  color: #fff;
  :hover {
    cursor: pointer;
  }
`;
