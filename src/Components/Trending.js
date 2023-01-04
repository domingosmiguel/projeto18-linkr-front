import styled from "styled-components";

export default function Trending(){
    return(
        <ContainerTrending>
            <TittleTrending>trending</TittleTrending>
            <LineWhite />
            <ContainerHashtags>
                <Hashtag># Hashtag</Hashtag>
                <Hashtag># Hashtag</Hashtag>
                <Hashtag># Hashtag</Hashtag>
                <Hashtag># Hashtag</Hashtag>
            </ContainerHashtags>
        </ContainerTrending>
    )
}

const ContainerTrending = styled.div`
    width: 301px;
    height: 406px;
    background-color: #171717;
    border-radius: 16px;
    position: absolute;
    top: 160px;
    right: 0;
`
const TittleTrending = styled.span`
    display: block;
    width: 100px;
    height: 60px;
    box-sizing: border-box;
    padding: 10px;

    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: #FFFFFF;
`
const LineWhite = styled.div`
width: 301px;
height: 1px;
background-color: #FFFFFF;
`
const ContainerHashtags = styled.div`
height: 293px;
display: flex;
box-sizing: border-box;
padding: 20px 10px;
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
`
const Hashtag = styled.div`
font-family: 'Lato';
font-style: normal;
font-weight: 700;
font-size: 19px;
line-height: 23px;
letter-spacing: 0.05em;
color: #FFFFFF;
`