import styled from "styled-components";
import {AiOutlineHeart} from "react-icons/ai";

export default function BoxPost() {
    return (

        <Post>
            <ImageProfile>
                <img src="https://cdn.pixabay.com/photo/2015/11/16/14/43/cat-1045782__340.jpg" alt="profile" />
                <div><AiOutlineHeart /><p>0 Likes</p></div>
            </ImageProfile>
            <PostContent>
                <span>User Name</span>
                <Text>Muito maneiro esse tutorial de Material UI com React, deem uma olhada! #react #material</Text>
                <Url>Preview url</Url>
            </PostContent>
        </Post>

    )
}

export const Post = styled.div`
    box-sizing: border-box;
    padding: 10px 18px;
    width: 611px;
    height: 276px;
    left: 241px;
    top: 470px;
    margin-bottom: 16px;
    background: #171717;
    border-radius: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
export const ImageProfile = styled.div`
    width: 50px;
    height: 260px;
    img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    div{
        height: 40px;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        svg{
            color:  #FFFFFF;
            font-size: 20px;
            cursor: pointer;
        }
    }
    p{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        text-align: center;
        color: #FFFFFF;
    }
   
`
export const PostContent = styled.div`
    width: 510px;
    height: 260px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    span{
        width: 502px;
        height: 23px;
        left: 327px;
        top: 489px;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        color: #FFFFFF;
    }
`
export const Text = styled.div`
    height: 50px;
    border-radius: 16px;
    margin-top: 8px;

    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #B7B7B7;
`
export const Url = styled.div`
    width: 503px;
    height: 155px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;

    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #CECECE;
`