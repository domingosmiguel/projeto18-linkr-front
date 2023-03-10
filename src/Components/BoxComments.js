import axios from 'axios';
import { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function BoxComments({
  open,
  postId,
  commentId,
  setCommentId,
  user,
  repost,
}) {
  const [comment, setComment] = useState('');
  const [disabled, setDisabled] = useState(false);
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };
  const baseURL = process.env.REACT_APP_BACKEND_URL;

  function publishComment() {
    setDisabled(true);
    const body = { comment };

    axios
      .post(`${baseURL}/post-comment/${postId}`, body, config)
      .then((res) => {
        console.log(res.data);
        atualizarComments();
      })
      .catch((err) => {
        console.log(err.response);
        setDisabled(false);
        setComment('');
        if (err.response.status === 401) {
          alert('your comment was not published');
        }
      });
  }

  function atualizarComments() {
    axios
      .get(`${baseURL}/post-comment/${postId}`, config)
      .then((res) => {
        setCommentId(res.data);
        setDisabled(false);
        setComment('');
      })
      .catch((err) => {
        console.log(err.response);
        setDisabled(false);
        setComment('');
      });
  }

  return (
    <ContainerBoxComments open={open}>
      {commentId === '' ? (
        <ThreeDots
          height='50'
          width='50'
          radius='9'
          color='#353535'
          ariaLabel='three-dots-loading'
          wrapperStyle={{}}
          wrapperClassName=''
          visible={true}
        />
      ) : (
        commentId.map((c) => (
          <BoxComment>
            <Comment>
              <img alt='profile' src={c.pictureUrl} />
              <TextComment>
                <div>
                  <Link to={`/user/${c.postId}`}>
                    <p>{c.username}</p>
                  </Link>
                  <span>
                    {' '}
                    {c.userId === c.quemPostou
                      ? '??? post???s author'
                      : c.following === true
                      ? '???  following'
                      : ''}
                  </span>
                </div>
                <span>{c.txt}</span>
              </TextComment>
            </Comment>
            <Line />
          </BoxComment>
        ))
      )}
      {repost ? (
        <></>
      ) : (
        <WriteComment>
          <img alt='profile' src={user.pictureUrl} />
          <InputWrite>
            <input
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              type='text'
              placeholder='write a comment...'
              disabled={disabled}
            />
            <FiSend onClick={publishComment} />
          </InputWrite>
        </WriteComment>
      )}
    </ContainerBoxComments>
  );
}

const ContainerBoxComments = styled.div`
  z-index: 0;
  box-sizing: border-box;
  padding-top: 35px;
  width: 100%;
  background: #1e1e1e;
  border-radius: 0 0 16px 16px;
  margin-top: -2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  display: ${(props) => (props.open === true ? '' : 'none')};
`;
const BoxComment = styled.div`
  width: 100%;
  height: 70px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 18px 25px;
`;
const Comment = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  img {
    width: 39px;
    height: 39px;
    border-radius: 26.5px;
  }
`;
const TextComment = styled.div`
  width: 80%;
  margin-left: 18px;
  & > div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    p {
      font-family: 'Lato';
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
      color: #f3f3f3;
    }
    span {
      font-family: 'Lato';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #565656;
      display: block;
      margin-left: 5px;
    }
  }

  span {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #acacac;
  }
  a {
    text-decoration: none;
  }
`;
const Line = styled.div`
  width: 571px;
  height: 0px;
  margin-top: 16px;
  border: 1px solid #353535;
  /* transform: rotate(-0.1deg); */
  @media (max-width: 974px) {
    width: 100%;
    border-radius: 0;
  }
`;
const WriteComment = styled.div`
  width: 100%;
  height: 70px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 18px 25px;
  & > div {
  }
  img {
    width: 39px;
    height: 39px;
    border-radius: 26.5px;
  }
`;
const InputWrite = styled.div`
  width: 510px;
  background: #252525;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  input {
    width: 90%;
    height: 39px;
    background: #252525;
    border-radius: 8px;
    border: none;
    box-sizing: border-box;
    padding: 11px 15px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #acacac;
    &:focus {
      outline: none;
    }
    &::-webkit-input-placeholder {
      font-family: 'Lato';
      font-style: italic;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      letter-spacing: 0.05em;
      color: #575757;
    }
    &:disabled {
      color: #000000;
      cursor: not-allowed;
    }
  }
  svg {
    font-size: 16px;
    color: #ffffff;
    margin-right: 15px;
    cursor: pointer;
  }
`;
