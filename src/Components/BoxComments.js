import styled from "styled-components";
import axios from "axios";

export default function BoxComments(){
    return(
        <ContainerBoxComments>
            <BoxComment>
                <Comment>
                   <img alt="profile" src="https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"/> 
                   <TextComment>OLÁ</TextComment>
                </Comment>
                <Line/>
            </BoxComment>
            <BoxComment>
                <Comment>
                   <img alt="profile" src="https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"/> 
                   <TextComment>OLÁ</TextComment>
                </Comment>
                <Line/>
            </BoxComment>
            <BoxComment>
                <Comment>
                   <img alt="profile" src="https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"/> 
                   <TextComment>OLÁ</TextComment>
                </Comment>
                <Line/>
            </BoxComment>
            <BoxComment>
                <Comment>
                   <img alt="profile" src="https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"/> 
                   <TextComment>OLÁ</TextComment>
                </Comment>
                <Line/>
            </BoxComment>
            <WriteComment/>
        </ContainerBoxComments>
    )
}

const ContainerBoxComments = styled.div`
    width: 611px;
    background: #1E1E1E;
    border-radius: 16px;
    /* position: absolute;
    top:80%;
    left: 0; */
    display: flex;
    flex-direction: column;
    align-items: center;
`
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
`
const Comment = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img{
        width: 39px;
        height: 39px;
        border-radius: 26.5px;
    }
`
const TextComment = styled.div`
    width: 80%;
`
const Line = styled.div`
    width: 571px;
    height: 0px;
    margin-top: 16px;
    border: 1px solid #353535;
    /* transform: rotate(-0.1deg); */
`
const WriteComment = styled.div`
    width: 100%;
    height: 70px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 18px 25px;
`