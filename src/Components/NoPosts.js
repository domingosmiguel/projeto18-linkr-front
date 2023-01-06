import styled from "styled-components";
import NoPost from "../Assets/error.png";

export default function NoPosts() {
    return (
        < BoxNoPost>
            <NoPost />
            There are no posts yet
        </BoxNoPost>
    )
}

const BoxNoPost = styled.div`
width: 100%;
height: 50%;
display: flex;
justify-content: center;
align-items: center;
img{
    width: 50px;
    height: 50px;
}
`