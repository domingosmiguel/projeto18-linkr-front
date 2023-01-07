import styled from "styled-components";
import { ProgressBar } from  'react-loader-spinner';

export default function Loading(){
    return(
        <BoxLading>
            <p>Loading</p>
            <ProgressBar
                height="150"
                width="150"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass="progress-bar-wrapper"
                borderColor = '#FFFFFF'
                barColor = '#1877f2'
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

    font-family: 'Lato';
    font-weight: 700;
    font-size: 30px;
    line-height: 17px;
    color: #ffffff;
`