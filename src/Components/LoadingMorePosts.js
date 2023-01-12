import styled from 'styled-components';
import { Oval } from 'react-loader-spinner';
import React from 'react';

const LoadingPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 20px;
  margin-bottom: 100px;
  margin-top: 80px;
  h2 {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    color: white;
  }
`;

export const LoadingMorePosts = React.forwardRef((props, ref) => (
  <LoadingPageStyled ref={ref}>
    <Oval
      height={40}
      width={40}
      color="white"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="grey"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
    <h2>Loading more posts...</h2>
  </LoadingPageStyled>
));
