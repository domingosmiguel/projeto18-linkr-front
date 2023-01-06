import styled from 'styled-components';
import { AiOutlineHeart } from 'react-icons/ai';
import Linkify from 'linkify-react';
import 'linkify-plugin-hashtag';
import { ReactTinyLink } from "react-tiny-link";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import axios from 'axios';
import { useContext } from "react";
import { DadosContext } from '../context/DadosContext';

export default function BoxPost({ post, user }) {
  const options = {
    formatHref: {
      hashtag: (href) => '/hashtag/' + href.substr(1),
    },
  };

  const { setPosts } = useContext(DadosContext);

  function deletePOst(id) {
    const responseDelete = window.confirm("Do you really want to delete this post?");
    if (responseDelete === true) {
      const config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      };

      axios.delete(`http://localhost:4000/user-posts/${id}`, config)
        .then((res) => {
          console.log(res.data)
          alert("Successfully Deleted Item");
          axios.get("http://localhost:4000/timeline-posts", config)
            .then((response) => {
              setPosts(response.data.posts);
            })
            .catch((error) => {
              console.log(error.response)
            })
        })
        .catch((err) => {
          console.log(err.response);
        })
    }
  }

  return (
    <Post>
      <ImageProfile>
        <img src={post.pictureUrl} alt="profile" />
        <div>
          <AiOutlineHeart />
          <p>0 Likes</p>
        </div>
      </ImageProfile>
      <PostContent>
        <BoxNameIcons>
          <span>{post.username}</span>
          {user.id===post.userId? <BoxIcons>
            <HiPencilAlt />
            <HiTrash onClick={() => deletePOst(post.id)} />
          </BoxIcons>:""}
        </BoxNameIcons>
        <Text>
          <Linkify options={options}>{post.txt}</Linkify>
        </Text>
        <Url>
          <ReactTinyLink
            cardSize="small"
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

  @media (max-width: 974px) {
    width: 100%;
    border-radius: 0;
  }
`
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
`
const PostContent = styled.div`
  width: 510px;
  height: 100%;
  box-sizing: border-box;
  gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
 
`
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
`
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
`
const BoxNameIcons = styled.div`
  width: 502px;
  height: 23px;
  display: flex;
  justify-content: space-between;
  align-items: center;
 span {
    width:50%;
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
`
const BoxIcons = styled.div`
  width: 30%;
  height: 23px;
  display: flex;
  justify-content: right;
  svg{
    font-size: 20px;
    color: #FFFFFF;
    margin-left: 10px;
    cursor: pointer;
  }
`