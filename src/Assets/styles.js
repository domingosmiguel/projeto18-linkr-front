import styled from 'styled-components';

export const ContainerTimeline = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #333333;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 0px;
  }
`;

export const ContainerPostsAndTrending = styled.div`
  width: 940px;
  min-height: 100%;
  margin-top: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: 974px) {
    width: 100%;
  }
`;
export const ContainerPosts = styled.div`
  width: 611px;
  height: 1000px;
  position: absolute;
  left: 0;
  top: 0;
  @media (max-width: 974px) {
    width: 100%;
    margin: 0 auto;
  }
`;

export const ContainerInputs = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  span {
    display: block;
    margin: 5px 0 10px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    color: #707070;

    @media (max-width: 974px) {
      margin: 0 auto 11px;
      font-size: 17px;
      line-height: 20px;
    }
  }
`;

export const InputLink = styled.input`
  width: 100%;
  height: 30px;
  left: 327px;
  top: 288px;
  background: #efefef;
  border-radius: 5px;
  border: none;
  margin-bottom: 5px;

  font-family: 'Lato';
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 18px;
  color: #949494;
  &::placeholder {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;
    color: #949494;
  }
  &:disabled {
    background-color: #b5b5b5;
    color: #000000;
  }
`;

export const InputText = styled.input`
  width: 100%;
  height: 66px;
  background: #efefef;
  border-radius: 5px;
  border: none;

  font-family: 'Lato';
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 18px;
  color: #949494;

  position: relative;
  &::placeholder {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;
    color: #949494;
    position: absolute;
    left: 10px;
    top: 10px;
  }
  &:disabled {
    background-color: #b5b5b5;
    color: #000000;
  }

  @media (max-width: 974px) {
    height: 47px;
  }
`;

export const MessageText = styled.p`
  width: fit-content;
  margin: 20px auto 0;
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #fff;
`;

export const TittlePosts = styled.div`
  width: 100%;
  font-family: 'Oswald', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 43px;
  line-height: 64px;
  color: #ffffff;
  display: flex;
  align-items: center;
  margin-top: 53px;

  span {
    margin-right: 0;
    width: 100%;
  }

  img {
    width: 100%;
    max-width: 55px;
    height: 55px;
    border-radius: 50%;
    margin: 0 18px;
    object-fit: cover;
  }

  @media (max-width: 974px) {
    padding: 10px 17px;
    font-size: 33px;
    line-height: 45px;
    margin-top: 64px;

    span {
      margin-right: 150px;
    }
  }
`;
