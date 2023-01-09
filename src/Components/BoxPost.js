import 'linkify-plugin-hashtag';
import Linkify from 'linkify-react';
import { useContext, useEffect, useRef, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { HiPencilAlt, HiTrash } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { ReactTinyLink } from 'react-tiny-link';
import styled from 'styled-components';
import { DadosContext } from '../context/DadosContext';

export default function BoxPost({ post, user }) {
  const { setIsOpen, setId } = useContext(DadosContext);
  const inputRef = useRef(null);
  const [editing, setEditing] = useState(false);
  const [idEdition, setIdEdition] = useState('');
  const [textEdited, setTextEdited] = useState(post.txt);
  function makeEdition(id) {
    setEditing(!editing);
    setIdEdition(id);
  }

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const options = {
    formatHref: {
      hashtag: (href) => '/hashtag/' + href.substr(1),
    },
  };

  function openModal(postId) {
    setId(postId);
    setIsOpen(true);
  }

  return (
    <Post>
      <ImageProfile>
        <img src={post.pictureUrl} alt='profile' />
        <div>
          <AiOutlineHeart />
          <p>0 Likes</p>
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
