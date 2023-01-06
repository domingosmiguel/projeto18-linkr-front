import styled from "styled-components";
import { ThreeDots } from  'react-loader-spinner';

export default function Loading(){
    return(
        <BoxLading>
            <p>Loading</p>
            <ThreeDots 
                        height="150" 
                        width="200" 
                        radius="9"
                        color=" #ffffff" 
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                         />
        </BoxLading>
    )
}

const BoxLading = styled.div`
    box-sizing: border-box;
    padding: 50px;
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    font-family: 'Seymour One', sans-serif;
    font-weight: 700;
    font-size: 40px;
    line-height: 17px;
    color: #ffffff;
`