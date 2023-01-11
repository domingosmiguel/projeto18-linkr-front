import styled from "styled-components";
import axios from "axios";
import { FiSend } from "react-icons/fi"

export default function BoxComments({open}) {
    const array = [1, 2, 3, 4];
    return (
        <ContainerBoxComments open={open}>
            {
                array.map(
                    (c) => <BoxComment>
                        <Comment>
                            <img alt="profile" src="https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80" />
                            <TextComment>
                                <div>
                                    <p>Nina</p>
                                    <span> •  following</span>
                                </div>
                                <span>
                                    Adorei esse post, ajuda muito a usar Material UI com React!
                                </span>
                            </TextComment>
                        </Comment>
                        <Line />
                    </BoxComment>
                )
            }
            <WriteComment>
                <img alt="profile" src="https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80" />
                <InputWrite>
                    <input
                        type="text"
                        placeholder="write a comment..." />
                    <FiSend />
                </InputWrite>

            </WriteComment>
        </ContainerBoxComments>
    )
}

const ContainerBoxComments = styled.div`
    width: 100%;
    background: #1E1E1E;
    border-radius: 16px;
    /* position: absolute;
    top:80%;
    left: 0; */
    display: flex;
    flex-direction: column;
    align-items: center;
    display: ${(props)=>props.open===true? "":"none"};
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
    justify-content: flex-start;
    align-items: center;
    img{
        width: 39px;
        height: 39px;
        border-radius: 26.5px;
    }
`
const TextComment = styled.div`
    width: 80%;
    margin-left: 18px;
    & > div{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        p{
            font-family: 'Lato';
            font-style: normal;
            font-weight: 700;
            font-size: 14px;
            line-height: 17px;
            color: #F3F3F3;
        }
        span{
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
    
    span{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #ACACAC;
    }
`
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
`
const WriteComment = styled.div`
    width: 100%;
    height: 70px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 18px 25px;
    & > div{

    }
    img{
        width: 39px;
        height: 39px;
        border-radius: 26.5px;
    }
`
const InputWrite = styled.div`
    width: 510px;
    background: #252525;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    input{
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
        color: #ACACAC;
        &:focus {
            outline: none;
        }
        &::-webkit-input-placeholder{
            font-family: 'Lato';
            font-style: italic;
            font-weight: 400;
            font-size: 14px;
            line-height: 17px;
            letter-spacing: 0.05em;
            color: #575757;
        }
    }
    svg{
            font-size: 16px;
            color: #FFFFFF;
            margin-right: 15px;
            cursor: pointer;
        }
   
`