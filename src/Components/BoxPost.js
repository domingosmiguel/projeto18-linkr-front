import styled from 'styled-components';
import { AiOutlineHeart } from 'react-icons/ai';
import Linkify from 'linkify-react';
import 'linkify-plugin-hashtag';

export default function BoxPost({ post }) {
  const options = {
    formatHref: {
      hashtag: (href) => '/hashtag/' + href.substr(1),
    },
  };
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
        <span>{post.username}</span>
        <Text>
          <Linkify options={options}>{post.txt}</Linkify>
        </Text>
        <Url>
          <a href={post.link}>{post.link}</a>
        </Url>
      </PostContent>
    </Post>
  );
}

export const Post = styled.div`
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
`;
export const ImageProfile = styled.div`
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
export const PostContent = styled.div`
  width: 510px;
  height: 100%;
  box-sizing: border-box;
  gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  span {
    width: 502px;
    height: 23px;
    left: 327px;
    top: 489px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #ffffff;
  }
`;
export const Text = styled.div`
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
export const Url = styled.div`
  width: 503px;
  height: 155px;
  border: 1px solid #4d4d4d;
  border-radius: 11px;

  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #cecece;
`;
